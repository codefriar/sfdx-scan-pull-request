/*
   Copyright 2022 Mitch Spano
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
	 https://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

import { getGithubFilePath, getScannerViolationType } from "../common.js";
import { graphql } from "@octokit/graphql";

import { context } from "@actions/github";
import {
  GithubComment,
  GithubExistingComment,
  GithubReviewComment,
} from "./reporter.types.js";
import { ScannerViolation } from "../sfdxCli.types.js";
import { promises as fs } from "fs";
import { DefaultArtifactClient } from "@actions/artifact";
import { BaseReporter } from "./base-reporter.js";
import { RequestParameters } from "@octokit/types";

const ERROR = "Error";

const HIDDEN_COMMENT_PREFIX = "<!--sfdx-scanner-->";
const COMMENTS_FILE_NAME = "sfdx-scanner-comments.md";

export class CommentsReporter extends BaseReporter<GithubComment> {
  /**
   * Read and write GitHub comments
   * @param method GET (read) or POST (write)
   * @param optionalBody Body is required when writing a new comment
   * @private
   */
  private async performGithubRequest<T>(
    method: "POST" | "GET",
    optionalBody?: GithubComment
  ) {
    const owner = context.repo.owner;
    const repo = context.repo.repo;
    const prNumber = context.payload.pull_request?.number;

    const endpoint = `${method} /repos/${owner}/${repo}/${
      prNumber ? `pulls/${prNumber}` : `commits/${context.sha}`
    }/comments`;

    return (
      method === "POST"
        ? this.octokit.request(endpoint, optionalBody)
        : this.octokit.paginate(endpoint)
    ) as Promise<T>;
  }

  private async createOneReviewWithMultipleComments(comments: GithubComment[]) {
    const owner = context.repo.owner;
    const repo = context.repo.repo;
    const pullRequestNumber = context.payload.pull_request?.number as number;

    console.log(
      "###### First Comment - raw: " + JSON.stringify(comments[0], null, 2)
    );

    const githubReviewComments: GithubReviewComment[] = comments.map(
      (comment) => ({
        path: comment.path,
        body: comment.body,
        line: comment.line + 1,
        side: comment.side,
        start_line: comment.start_line,
        start_side: comment.start_side,
      })
    );

    const apiUrl = `/repos/${owner}/${repo}/pulls/${pullRequestNumber}/reviews`;

    const jsonBody = {
      body: "Salesforce Scanner found some issues in this pull request. Please review the comments below and make the necessary changes.",
      event: "REQUEST_CHANGES",
      comments: githubReviewComments,
    };

    console.log("###### jsonBody: \n", JSON.stringify(jsonBody, null, 2));

    try {
      await this.octokit.request(`POST ${apiUrl}`, {
        data: jsonBody,
      });
    } catch (error) {
      console.error("Error creating pull request review:", error);
    }

    // try {
    //   const params = {
    //     body: "Salesforce Scanner found some issues in this pull request. Please review the comments below and make the necessary changes.",
    //     event: "REQUEST_CHANGES",
    //     comments: githubReviewComments,
    //   } as RequestParameters;
    //   console.debug(JSON.stringify(params, null, 2));
    //   //comment
    //   // @ts-ignore
    //   const response = await this.octokit.pulls.createReview(params);
    //
    //   console.log("Pull request review created successfully:", response.data);
    // } catch (error) {
    //   console.error("Error creating pull request review:", error);
    // }
  }

  /**
   * Delete a single GitHub comment
   * @param comment Comment to delete
   * @private
   */
  private async performGithubDeleteRequest(comment: GithubExistingComment) {
    const owner = context.repo.owner;
    const repo = context.repo.repo;
    const endpoint = `DELETE /repos/${owner}/${repo}/pulls/comments/${comment.id}`;
    await this.octokit.request(endpoint);
  }

  /**
   * @description Writes the relevant comments to the GitHub pull request.
   * Uses the octokit to post the comments to the PR.
   */
  async write() {
    this.logger(
      `Writing comments to PR ${context.payload.pull_request?.number} using GitHub REST API...`
    );
    // This gets any comments that have our hidden comment prefix
    const existingComments = await this.getExistingComments();

    // This returns the difference between all issues and existing comments.
    // The idea is that we'll discover here the issues that need net-new comments to be written.
    const netNewIssues = await this.filterOutExistingComments(existingComments);

    // moving this up the stack to enable deleting resolved comments before trying to write new ones
    if (this.inputs.deleteResolvedComments) {
      this.logger(
        "As instructed in the inputs, the scanner is now deleting resolved comments"
      );
      await this.deleteResolvedComments(this.issues, existingComments);
    }
    // If there are no new comments to write, then we'll just log a message and return.

    await this.createOneReviewWithMultipleComments(netNewIssues);

    // Turning this off for a bit during testing.
    // if (netNewIssues.length < 1) {
    //   console.log(
    //     "The scanner found no new issues that have not already had comments generated for them (and possibly resolved)."
    //   );
    // } else if (
    //   netNewIssues.length >= 1 &&
    //   netNewIssues.length < this.inputs.maxNumberOfComments
    // ) {
    //   for (let comment of netNewIssues) {
    //     try {
    //       await this.performGithubRequest("POST", comment);
    //     } catch (error) {
    //       console.error(
    //         "Error when writing comments: " + JSON.stringify(error, null, 2)
    //       );
    //     }
    //   }
    // } else {
    //   // If we have net-new comments that exceed the max number of comments, we'll write them to an artifact instead.
    //   this.logger(
    //     `New issue count of ${netNewIssues.length} is in excess of threshold value of ${this.inputs.maxNumberOfComments}, writing to artifact instead`
    //   );
    //   await this.uploadCommentsAsArtifactAndPostComment(netNewIssues);
    // }
    this.checkHasHaltingError();
  }

  /**
   * @description Filters out the comments that already exist on the PR. This was extracted from the write method
   * to facilitate gathering and re-using this data.
   * @param existingComments
   * @private
   */
  private async filterOutExistingComments(existingComments: GithubComment[]) {
    // iterate over the issues and filter out any that do not have existing comments
    return this.issues.filter((issue) => {
      return !existingComments.find((existingComment) =>
        this.matchComment(issue, existingComment)
      );
    });
  }

  /**
   * @description Writes the comments to a file and uploads the file as an artifact. Also posts a comment on the PR.
   * @param comments
   * @private
   */
  private async uploadCommentsAsArtifactAndPostComment(
    comments: GithubComment[]
  ) {
    await fs.writeFile(
      COMMENTS_FILE_NAME,
      comments.map((comment) => comment.body).join("\n\n")
    );
    try {
      let artifactResponse = await new DefaultArtifactClient().uploadArtifact(
        COMMENTS_FILE_NAME,
        [COMMENTS_FILE_NAME],
        process.cwd()
      );
      console.log(
        "Artifact upload response: " + JSON.stringify(artifactResponse, null, 2)
      );
    } catch (error) {
      console.error(
        "Error when uploading artifact: " + JSON.stringify(error, null, 2)
      );
    }
    try {
      const comment = {
        body: `sf scanner run found too many violations and was unable to upload them all as individual comments. Instead, all findings have been written to this PR as an artifact. See the attached artifact for details.`,
        commit_id: this.issues[0]?.commit_id,
        path: this.issues[0]?.path,
        line: 1,
      } as GithubComment;
      await this.performGithubRequest("POST", comment);
    } catch (error) {
      console.error(
        "Failed to upload artifact or post comment: " +
          JSON.stringify(error, null, 2)
      );
    }
  }

  /**
   * @description Deletes all comments that have been detected as resolved.
   * Deletion is used because resolving is not available in the REST API
   * @param newComments
   * @param existingComments
   * @private
   */
  private async deleteResolvedComments(
    newComments: GithubComment[],
    existingComments: GithubExistingComment[]
  ) {
    // Get all existing comments that are *not* in the new comments
    const resolvedComments = existingComments.filter(
      (existingComment) =>
        !newComments.find((newComment) =>
          this.matchComment(existingComment, newComment)
        )
    );
    this.logger("Resolved comments to delete: " + resolvedComments.length);
    for (const comment of resolvedComments) {
      await this.performGithubDeleteRequest(comment);
    }
  }

  /**
   * @description Get the existing Comments on the PR, filtered by if they include
   *  the hidden comment prefix and if they were generated by a bot
   */
  private async getExistingComments() {
    let result = Array<GithubExistingComment>();
    try {
      // @ts-ignore
      result = await this.performGithubRequest<GithubExistingComment[]>("GET");
      this.logger("Found: " + result.length + " existing comments");
      result = result.filter(
        (comment) =>
          comment.body.includes(HIDDEN_COMMENT_PREFIX) &&
          comment.user.type === "Bot"
      );
    } catch (error) {
      console.error(
        "Error when fetching existing comments: " +
          JSON.stringify(error, null, 2)
      );
    }
    return result;
  }

  /**
   * @description Compares two comments and determines if they are the same
   * @param commentA
   * @param commentB
   * @return boolean If the comments are the same
   */
  matchComment(commentA: GithubComment, commentB: GithubComment) {
    // Removes the "File" property from each body
    // since that particular column is commit-specific (and thus would always differ)
    const getSanitizedBody = (body: string) =>
      body
        .split("|")
        .filter((bodySection) => bodySection)
        .slice(0, -1)
        .toString();
    return (
      commentA.line === commentB.line &&
      getSanitizedBody(commentA.body) === getSanitizedBody(commentB.body) &&
      commentA.path === commentB.path
    );
  }

  /**
   * @description Translates a violation object into a comment
   *  with a formatted body
   * @param filePath File path that the violation took place in
   * @param violation sfdx-scanner violation
   * @param engine The engine that discovered the violation
   * @returns {} The comment that will be submitted to GitHub
   */
  translateViolationToReport(
    filePath: string,
    violation: ScannerViolation,
    engine: string
  ): void {
    const startLine = parseInt(violation.line);
    let endLine = violation.endLine
      ? parseInt(violation.endLine)
      : parseInt(violation.line);
    if (endLine === startLine) {
      endLine++;
    }

    const violationType = getScannerViolationType(
      this.inputs,
      violation,
      engine
    );
    if (violationType === ERROR) {
      this.hasHaltingError = true;
    }
    const commit_id = this.context.payload.pull_request
      ? this.context.payload.pull_request.head.sha
      : this.context.sha;

    this.issues.push({
      commit_id,
      path: filePath,
      start_line: startLine,
      start_side: "RIGHT",
      side: "RIGHT",
      line: endLine,
      body: this.getFormattedBody(
        engine,
        violationType,
        violation,
        filePath,
        commit_id
      ),
    });
  }

  /**
   * @description Formats the body of a review comment as a table
   * @param engine - reporting engine responsible for identifying the violation
   * @param violationType - error or warning depending on threshold and strictly enforced rules
   * @param violation - raw violation from the scan
   * @param filePath - path to the file
   * @param commit_id - Id of the commit to generate a link to the file
   */
  getFormattedBody(
    engine: string,
    violationType: string,
    violation: ScannerViolation,
    filePath: string,
    commit_id: string
  ): string {
    const commentHeader = `${HIDDEN_COMMENT_PREFIX}
| Attribute | Value |
| --- | --- |`;
    return `${commentHeader}
| Engine | ${engine}|
| Category | ${violation.category} |
| Rule | ${violation.ruleName} |
| Severity | ${violation.severity} |
| Type | ${violationType} |
| Message| [${violation.message.trim()}](${violation.url}) |
| File | [${filePath}](${getGithubFilePath(commit_id, filePath)}) |`;
  }

  logger(message: string) {
    if (this.inputs.debug) {
      console.debug("Logger says: " + message);
    }
  }
}
