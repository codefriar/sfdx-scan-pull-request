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

import { getGithubFilePath, getScannerViolationType } from "../common";

import { Octokit } from "@octokit/action";
import { context } from "@actions/github";
import {
  BaseReporter,
  GithubComment,
  GithubExistingComment,
} from "./reporter.types";
import { ScannerViolation } from "../sfdxCli";
import { promises as fs} from "fs";
import { DefaultArtifactClient } from "@actions/artifact";

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
  private performGithubRequest<T>(
    method: "POST" | "GET",
    optionalBody?: GithubComment
  ) {
    const octokit = new Octokit();
    const owner = context.repo.owner;
    const repo = context.repo.repo;
    const prNumber = context.payload.pull_request?.number;

    const endpoint = `${method} /repos/${owner}/${repo}/${
      prNumber ? `pulls/${prNumber}` : `commits/${context.sha}`
    }/comments`;

    return (
      method === "POST"
        ? octokit.request(endpoint, optionalBody)
        : octokit.paginate(endpoint)
    ) as Promise<T>;
  }

  /**
   * Delete a single GitHub comment
   * @param comment Comment to delete
   * @private
   */
  private async performGithubDeleteRequest(comment: GithubExistingComment) {
    const octokit = new Octokit();
    const owner = context.repo.owner;
    const repo = context.repo.repo;
    const endpoint = `DELETE /repos/${owner}/${repo}/pulls/comments/${comment.id}`;
    await octokit.request(endpoint);
  }

  /**
   * @description Writes the relevant comments to the GitHub pull request.
   * Uses the octokit to post the comments to the PR.
   */
  async write() {
    console.log("Writing comments using GitHub REST API...");
    const existingComments = await this.getExistingComments();
    console.log('Gathered existing comments: ' + existingComments.length);
    const netNewComments = await this.filterOutExistingComments(existingComments);
    console.error('Net new comments: ' + netNewComments.length);
    // moving this up the stack to enable deleting resolved comments before trying to write new ones
    if (this.inputs.deleteResolvedComments) {
      await this.deleteResolvedComments(this.issues, existingComments);
    }
    console.error('Deleted resolved Comments');
    if(netNewComments.length > this.inputs.maxNumberOfComments) {
      console.error('Too many comments to write, switching to artifact upload');
      // If the number of violations is higher than the developer-specified maximum,
      // then we'll write the violations to a file, attach that file, and write a single comment
      // referencing the attached file.
      await this.uploadCommentsAsArtifactAndPostComment(netNewComments);
    } else if(netNewComments.length > 15) {
      console.error(`Writing comments in batches of ${this.inputs.commentBatchSize}`);
      // 15 is a heuristic # of comments that can be written without hitting rate limits. this might require tweaking.
      // in this case, we'll write the comments in batches of 15, with a delay in between each batch.
      await this.writeCommentsInBatches(netNewComments);
    }

    this.checkHasHaltingError();
  }

  private async writeCommentsInBatches(comments: GithubComment[]) {
    for(let index = 0; index <comments.length; index += this.inputs.commentBatchSize){
      const thisBatch = comments.slice(index, index + this.inputs.commentBatchSize);
      await Promise.all([this.postCommentBatch(thisBatch), new Promise(resolve => setTimeout(resolve, this.inputs.rateLimitWaitTime))]);
    }
  }

  private async postCommentBatch(thisBatch: GithubComment[]){
    for(const comment of thisBatch){
      try {
        await this.performGithubRequest("POST", comment);
      } catch (error) {
        console.error(
            "Error when writing comments: " + JSON.stringify(error, null, 2)
        );
      }
    }
  }

  private async filterOutExistingComments(existingComments: GithubComment[]) {
    // iterate over the issues and filter out any that do not have existing comments
    return this.issues.filter((issue) => {
      return !existingComments.find((existingComment) =>
        this.matchComment(issue, existingComment)
      );
    });
  }

  private async uploadCommentsAsArtifactAndPostComment(comments: GithubComment[]) {
    console.error('Starting to write comments to a file and upload as artifact');
    await fs.writeFile(COMMENTS_FILE_NAME, comments.map(comment => comment.body).join("\n\n"));
    console.error(`Wrote comments to ${COMMENTS_FILE_NAME}`);
    try {
      console.error(`Uploading ${COMMENTS_FILE_NAME} as artifact`);
      await new DefaultArtifactClient().uploadArtifact(COMMENTS_FILE_NAME, [COMMENTS_FILE_NAME], process.cwd());
      console.error(`Uploaded ${COMMENTS_FILE_NAME} as artifact`);
      const comment = {
        body: `Too many violations to display in a single comment. See the attached artifact for details.`,
      } as GithubComment;
      await this.performGithubRequest("POST", comment);
      console.error('Uploaded comments as artifact and posted comment');
    } catch (error) {
      console.error('Failed to upload artifact or post comment: ' + JSON.stringify(error, null, 2));
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

    for (let comment of resolvedComments) {
      if (comment.id) {
        console.log(
          `Removing the comment because the issue appears to be resolved: Id: ${comment.id}, File: ${comment?.path}, Body: ${comment.body}`
        );
        // This shouldn't use Promise.all() or there may be issues with GH API limits
        await this.performGithubDeleteRequest(comment);
      }
    }
  }

  /**
   * @description Get the existing Comments on the PR, filtered by if they include
   *  the hidden comment prefix and if they were generated by a bot
   */
  private async getExistingComments() {
    console.log("Getting existing comments using GitHub REST API...");
    let result = Array<GithubExistingComment>();
    console.log('In getExistingComments');
    try {
      let result = await this.performGithubRequest("GET") as GithubExistingComment[];
      console.log(`In Try/Catch. Found: ${result.length} results`);
      const filteredResult = result.filter((comment) => comment.body.includes(HIDDEN_COMMENT_PREFIX) && comment.user.type === "Bot");
      console.log(`Filtered: ${filteredResult.length} results`);
      // result = (
      //   await this.performGithubRequest<GithubExistingComment[]>("GET")
      // ).filter(
      //   (comment) =>
      //     comment.body.includes(HIDDEN_COMMENT_PREFIX) &&
      //     comment.user.type === "Bot"
      // );
      console.log("In Try/Catch: " + result.length);

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
  ) {
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
}
