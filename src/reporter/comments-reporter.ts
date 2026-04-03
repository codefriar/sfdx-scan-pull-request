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
import { context } from "@actions/github";
import {
  GithubComment,
  GithubExistingComment,
  GithubReviewComment,
} from "./reporter.types.js";
import { GraphQLResponse } from "../githubGraphQLTypes.js";
import { ScannerViolation } from "../sfdxCli.types.js";
import { BaseReporter } from "./base-reporter.js";

const HIDDEN_COMMENT_PREFIX = "<!--sfdx-scanner-->";

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

  /**
   * @description Creates a single review with multiple comments, all in one api call.
   * @param comments a list of comments to be included in the review.
   * @private
   */
  private async createOneReviewWithMultipleComments(comments: GithubComment[]) {
    const owner = context.repo.owner;
    const repo = context.repo.repo;
    const pullRequestNumber = context.payload.pull_request?.number as number;

    this.logger(`Processing ${comments.length} comments for PR review`);

    // CRITICAL: Filter out comments where the target line is NOT in the diff
    const validComments = comments.filter((comment) => {
      const diffInfo = this.diffInfo.get(comment.path);

      if (!diffInfo) {
        this.logger(
          `WARNING: No diff info found for ${comment.path} - rejecting comment`
        );
        return false;
      }

      const lineInDiff = diffInfo.changedLines.has(comment.line);

      if (!lineInDiff) {
        this.logger(
          `WARNING: Rejecting comment for ${comment.path} line ${comment.line} - not in diff. Changed lines: ${Array.from(diffInfo.changedLines).sort((a, b) => a - b).join(', ')}`
        );
        return false;
      }

      this.logger(`✓ Comment for ${comment.path} line ${comment.line} is valid`);
      return true;
    });

    this.logger(
      `After filtering: ${validComments.length} valid comments (rejected ${comments.length - validComments.length})`
    );

    if (validComments.length === 0) {
      this.logger("No valid comments to submit - all were filtered out");
      return;
    }

    // Create review comments with intelligent multi-line vs single-line logic
    const githubReviewComments: GithubReviewComment[] = validComments.map(
      (comment) => {
        const isMultiLine = comment.line !== comment.start_line;
        const diffInfo = this.diffInfo.get(comment.path);

        this.logger(
          `Creating comment for ${comment.path} lines ${comment.start_line}-${comment.line}`
        );

        // For multi-line comments, verify both lines are in the diff and in the same hunk
        if (isMultiLine && diffInfo) {
          const startLineInDiff = diffInfo.changedLines.has(comment.start_line);
          const endLineInDiff = diffInfo.changedLines.has(comment.line);
          const startHunk = diffInfo.lineToHunk.get(comment.start_line);
          const endHunk = diffInfo.lineToHunk.get(comment.line);

          this.logger(
            `  Multi-line: start_line ${comment.start_line} in diff: ${startLineInDiff} (hunk ${startHunk}), end line ${comment.line} in diff: ${endLineInDiff} (hunk ${endHunk})`
          );

          // Only create multi-line comment if BOTH lines are in the diff AND in the same hunk
          if (startLineInDiff && endLineInDiff && startHunk !== undefined && startHunk === endHunk) {
            this.logger(`  ✓ Creating multi-line comment`);
            return {
              path: comment.path,
              body: `${comment.body}`,
              line: comment.line,
              side: comment.side,
              start_line: comment.start_line,
              start_side: comment.start_side,
            };
          } else {
            this.logger(
              `  ! Falling back to single-line comment on line ${comment.line}`
            );
          }
        }

        // Single-line comment (or fallback from invalid multi-line)
        this.logger(`  ✓ Creating single-line comment on line ${comment.line}`);
        return {
          path: comment.path,
          body: `${comment.body}`,
          line: comment.line,
          side: comment.side,
        };
      }
    );

    const apiUrl = `/repos/${owner}/${repo}/pulls/${pullRequestNumber}/reviews`;

    const jsonBody = {
      body: "Salesforce Scanner found some issues in this pull request. Please review the comments below and make the necessary changes.",
      event: "REQUEST_CHANGES",
      comments: githubReviewComments,
    };

    try {
      this.logger(`Submitting review with ${githubReviewComments.length} comments`);
      await this.octokit.request(`POST ${apiUrl}`, {
        data: jsonBody,
      });
      this.logger("Successfully created PR review");
    } catch (error) {
      console.error(
        "Error creating pull request review:",
        JSON.stringify(error, null, 2)
      );
      throw error;
    }
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
   * @description pull the Pull Request review threads that are resolved for this PR using the GraphQL Api
   * we'll use these to determine which comments are resolved and can be ignored - and not throw a halting error.
   * @private
   */

  private async fetchResolvedReviewCommentThreads(): Promise<GithubComment[]> {
    const owner = context.repo.owner;
    const repo = context.repo.repo;
    const prNumber = context.payload.pull_request?.number;

    const query = `
      query GetPRReviewThreads($owner: String!, $repo: String!, $prNumber: Int!) {
        repository(owner: $owner, name: $repo) {
          pullRequest(number: $prNumber) {
            reviewThreads(first: 100) {
              nodes {
                id
                isResolved
                comments(first: 100) {
                  nodes {
                    commit {
                      oid
                    }
                    body
                    startLine
                    line
                    url
                    path
                  }
                }
              }
            }
          }
        }
      }`;

    const result: GraphQLResponse = await this.octokit.graphql<GraphQLResponse>(
      query,
      {
        owner: owner,
        repo: repo,
        prNumber: prNumber,
      }
    );
    // Filter out only resolved threads and map to get only the bodies of the comments
    const resolvedComments: GithubComment[] =
      result.repository.pullRequest.reviewThreads.nodes
        .filter((thread) => thread.isResolved)
        .flatMap((thread) =>
          thread.comments.nodes.map((comment) => ({
            commit_id: comment.commit.oid,
            path: comment.path,
            start_line: comment.startLine,
            start_side: "RIGHT",
            side: "RIGHT",
            line: comment.line,
            body: comment.body,
            url: comment.url,
          }))
        );
    this.logger(
      `Found ${resolvedComments.length} comments to be part of a Resolved Comment thread`
    );
    return resolvedComments;
  }

  /**
   * @description Writes the relevant comments to the GitHub pull request.
   * Uses the octokit to post the comments to the PR.
   */
  async write() {
    this.logger(
      `Scanner found ${this.issues.length} issues on PR ${context.payload.pull_request?.number}. Note: some may be pre-existing or resolved.`
    );
    // This gets any comments that have our hidden comment prefix
    const existingComments = await this.getExistingComments();
    this.logger(
      `Found ${existingComments.length} existing comments with the hidden comment prefix indicating the Scanner as the author.`
    );

    // Fetch resolved review comment threads ONCE
    const resolvedComments = await this.fetchResolvedReviewCommentThreads();

    // This returns the difference between all issues and existing comments.
    // The idea is that we'll discover here the issues that need net-new comments to be written.
    const netNewIssues = this.filterOutExistingComments(existingComments, resolvedComments);
    this.logger(
      `Found ${netNewIssues.length} new issues that do not have an existing comment or a resolved comment thread.`
    );
    // moving this up the stack to enable deleting resolved comments before trying to write new ones
    if (this.inputs.deleteResolvedComments) {
      await this.deleteResolvedComments(this.issues, existingComments);
    }

    // Identify unresolved existing comments
    const unresolvedExistingComments = existingComments.filter(
      (existingComment) =>
        !resolvedComments.find((resolvedComment) =>
          this.matchComment(existingComment, resolvedComment)
        )
    );

    this.logger(
      `Found ${unresolvedExistingComments.length} unresolved existing comments.`
    );

    // Flag the build if there are unresolved existing comments
    if (unresolvedExistingComments.length > 0) {
      this.logger(
        `Failing the build due to ${unresolvedExistingComments.length} unresolved existing comments.`
      );
      this.hasHaltingError = true;
      this.checkHasHaltingError();
    }

    // If there are no new comments to write, then log a message and return.
    if (netNewIssues.length === 0) {
      this.logger("No new issues to report.");
      return;
    }

    // At this point, if we have any "new issues" i.e. issues that have not been resolved either through the ui
    // or through a code change should be written to the PR as review comments and should block the build.
    this.logger(
      `${
        this.issues.length - netNewIssues.length
      } new issues found. Creating a new review with ${
        netNewIssues.length
      } comments.`
    );
    await this.createOneReviewWithMultipleComments(netNewIssues);

    // need a comparison count between the issues and the to delete, and resolved. to discover count of unresolved issues

    this.logger(
      "Comments have been written to the Pr review. Check the PR for more details."
    );

    if (netNewIssues.length > 0) {
      this.logger(
        `Failing the build due to ${netNewIssues.length} new issues found.`
      );
      this.hasHaltingError = true;
    }

    this.checkHasHaltingError();
  }

  /**
   * @description Filters out the comments that already exist on the PR. This was extracted from the write method
   * to facilitate gathering and re-using this data.
   * @param existingComments
   * @private
   */
  private filterOutExistingComments(
    existingComments: GithubComment[],
    resolvedComments: GithubComment[]
  ): GithubComment[] {
    const newIssues = this.issues.filter((issue) => {
      return !existingComments.find((existingComment) =>
        this.matchComment(issue, existingComment)
      );
    });
    return newIssues.filter((issue) => {
      return !resolvedComments.find((resolvedComment) =>
        this.matchComment(issue, resolvedComment)
      );
    });
  }

  /**
   * @description Deletes all comments that have been detected as resolved.
   * Deletion is used because resolving is not available in the REST API
   *
   * Note: A comment is considered resolved if the issue that triggered it is no longer present in the PR.
   *
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
    if (resolvedComments.length > 0) {
      this.logger(
        `${resolvedComments.length} comments were previously found, but have been resolved via code commits. Deleting...`
      );
    }
    for (const comment of resolvedComments) {
      await this.performGithubDeleteRequest(comment);
    }
  }

  /**
   * @description Get the existing Comments on the PR, filtered by if they include
   *  the hidden comment prefix and if they were generated by a bot
   */
  private async getExistingComments(): Promise<GithubExistingComment[]> {
    try {
      const owner = context.repo.owner;
      const repo = context.repo.repo;
      const prNumber = context.payload.pull_request?.number;
      const endpoint = `GET /repos/${owner}/${repo}/${
        prNumber ? `pulls/${prNumber}` : `commits/${context.sha}`
      }/comments`;
      const result = (await this.octokit.paginate(endpoint)) as GithubExistingComment[];
      return result.filter(
        (comment) => comment.body.includes(HIDDEN_COMMENT_PREFIX) && comment.user.type === "Bot"
      );
    } catch (error) {
      console.error("Error when fetching existing comments: " + JSON.stringify(error, null, 2));
      return [];
    }
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
    const endLine = violation.endLine
      ? parseInt(violation.endLine)
      : parseInt(violation.line);

    this.logger(
      `Creating comment for ${filePath}, rule ${violation.ruleName}, lines ${startLine}-${endLine}`
    );

    const violationType = getScannerViolationType(
      this.inputs,
      violation,
      engine
    );
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
