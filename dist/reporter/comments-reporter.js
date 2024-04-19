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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getGithubFilePath, getScannerViolationType } from "../common.js";
import { context } from "@actions/github";
import { promises as fs } from "fs";
import { DefaultArtifactClient } from "@actions/artifact";
import { BaseReporter } from "./base-reporter.js";
const ERROR = "Error";
const HIDDEN_COMMENT_PREFIX = "<!--sfdx-scanner-->";
const COMMENTS_FILE_NAME = "sfdx-scanner-comments.md";
export class CommentsReporter extends BaseReporter {
    /**
     * Read and write GitHub comments
     * @param method GET (read) or POST (write)
     * @param optionalBody Body is required when writing a new comment
     * @private
     */
    performGithubRequest(method, optionalBody) {
        var _a;
        const owner = context.repo.owner;
        const repo = context.repo.repo;
        const prNumber = (_a = context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.number;
        const endpoint = `${method} /repos/${owner}/${repo}/${prNumber ? `pulls/${prNumber}` : `commits/${context.sha}`}/comments`;
        // @ts-ignore
        return (method === "POST"
            ? this.octokit.request(endpoint, optionalBody)
            : this.octokit.paginate(endpoint));
    }
    /**
     * Delete a single GitHub comment
     * @param comment Comment to delete
     * @private
     */
    performGithubDeleteRequest(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = context.repo.owner;
            const repo = context.repo.repo;
            const endpoint = `DELETE /repos/${owner}/${repo}/pulls/comments/${comment.id}`;
            yield this.octokit.request(endpoint);
        });
    }
    /**
     * @description Writes the relevant comments to the GitHub pull request.
     * Uses the octokit to post the comments to the PR.
     */
    write() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger("Writing comments using GitHub REST API...");
            const existingComments = yield this.getExistingComments();
            const netNewComments = yield this.filterOutExistingComments(existingComments);
            this.logger("Deleting resolved comments");
            // moving this up the stack to enable deleting resolved comments before trying to write new ones
            if (this.inputs.deleteResolvedComments) {
                yield this.deleteResolvedComments(this.issues, existingComments);
            }
            if (netNewComments.length === 0) {
                console.error("The scanner found unresolved issues that have already been identified.");
            }
            if (netNewComments.length > this.inputs.maxNumberOfComments) {
                // If the number of violations is higher than the developer-specified maximum,
                // then we'll write the violations to a file, attach that file, and write a single comment
                // referencing the attached file.
                this.logger(`Comment count threshold of ${this.inputs.maxNumberOfComments} exceeded, writing to artifact instead`);
                yield this.uploadCommentsAsArtifactAndPostComment(netNewComments);
            }
            else {
                for (let comment of netNewComments) {
                    try {
                        yield this.performGithubRequest("POST", comment);
                    }
                    catch (error) {
                        console.error("Error when writing comments: " + JSON.stringify(error, null, 2));
                    }
                }
            }
            this.checkHasHaltingError();
        });
    }
    /**
     * @description Writes the comments to the PR in batches to avoid rate limits
     * @param comments the list of comments to write
     * @param action the action to take (POST or DELETE)
     * @private
     */
    processCommentsInBatches(comments, action) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger("Processing comments in batches: " +
                comments.length +
                " total comments. Batch size: " +
                this.inputs.commentBatchSize +
                " Total Number of Batches " +
                comments.length / this.inputs.commentBatchSize);
            for (let index = 0; index < comments.length; index += this.inputs.commentBatchSize) {
                this.logger("Processing batch " + index);
                const thisBatch = comments.slice(index, index + this.inputs.commentBatchSize);
                // this doesn't resolve until both the api calls and the wait time have passed, but it does both in parallel.
                yield Promise.all([
                    this.processAPIBatch(thisBatch, action),
                    new Promise((resolve) => setTimeout(resolve, this.inputs.rateLimitWaitTime)),
                ]);
                this.logger("Batch processed");
            }
        });
    }
    processAPIBatch(thisBatch, action) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const comment of thisBatch) {
                try {
                    switch (action) {
                        case "POST":
                            yield this.performGithubRequest("POST", comment);
                            break;
                        case "DELETE":
                            yield this.performGithubDeleteRequest(comment);
                            break;
                    }
                }
                catch (error) {
                    console.error(`Error when processing comments: ${action} passed, resulting in: ${JSON.stringify(error, null, 2)}`);
                }
            }
        });
    }
    /**
     * @description Filters out the comments that already exist on the PR. This was extracted from the write method
     * to facilitate gathering and re-using this data.
     * @param existingComments
     * @private
     */
    filterOutExistingComments(existingComments) {
        return __awaiter(this, void 0, void 0, function* () {
            // iterate over the issues and filter out any that do not have existing comments
            return this.issues.filter((issue) => {
                return !existingComments.find((existingComment) => this.matchComment(issue, existingComment));
            });
        });
    }
    /**
     * @description Writes the comments to a file and uploads the file as an artifact. Also posts a comment on the PR.
     * @param comments
     * @private
     */
    uploadCommentsAsArtifactAndPostComment(comments) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            yield fs.writeFile(COMMENTS_FILE_NAME, comments.map((comment) => comment.body).join("\n\n"));
            try {
                let artifactResponse = yield new DefaultArtifactClient().uploadArtifact(COMMENTS_FILE_NAME, [COMMENTS_FILE_NAME], process.cwd());
                console.log("Artifact upload response: " + JSON.stringify(artifactResponse, null, 2));
            }
            catch (error) {
                console.error("Error when uploading artifact: " + JSON.stringify(error, null, 2));
            }
            try {
                const comment = {
                    body: `sf scanner run found too many violations and was unable to upload them all as individual comments. Instead, all findings have been written to this PR as an artifact. See the attached artifact for details.`,
                    commit_id: (_a = this.issues[0]) === null || _a === void 0 ? void 0 : _a.commit_id,
                    path: (_b = this.issues[0]) === null || _b === void 0 ? void 0 : _b.path,
                    line: 1,
                };
                yield this.performGithubRequest("POST", comment);
            }
            catch (error) {
                console.error("Failed to upload artifact or post comment: " +
                    JSON.stringify(error, null, 2));
            }
        });
    }
    /**
     * @description Deletes all comments that have been detected as resolved.
     * Deletion is used because resolving is not available in the REST API
     * @param newComments
     * @param existingComments
     * @private
     */
    deleteResolvedComments(newComments, existingComments) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get all existing comments that are *not* in the new comments
            const resolvedComments = existingComments.filter((existingComment) => !newComments.find((newComment) => this.matchComment(existingComment, newComment)));
            this.logger("Resolved comments to delete: " + resolvedComments.length);
            yield this.processCommentsInBatches(resolvedComments, "DELETE");
        });
    }
    /**
     * @description Get the existing Comments on the PR, filtered by if they include
     *  the hidden comment prefix and if they were generated by a bot
     */
    getExistingComments() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = Array();
            try {
                result = yield this.performGithubRequest("GET");
                this.logger("Result of getExistingComments: " + result.length);
                result = result.filter((comment) => comment.body.includes(HIDDEN_COMMENT_PREFIX) &&
                    comment.user.type === "Bot");
            }
            catch (error) {
                console.error("Error when fetching existing comments: " +
                    JSON.stringify(error, null, 2));
            }
            return result;
        });
    }
    /**
     * @description Compares two comments and determines if they are the same
     * @param commentA
     * @param commentB
     * @return boolean If the comments are the same
     */
    matchComment(commentA, commentB) {
        // Removes the "File" property from each body
        // since that particular column is commit-specific (and thus would always differ)
        const getSanitizedBody = (body) => body
            .split("|")
            .filter((bodySection) => bodySection)
            .slice(0, -1)
            .toString();
        return (commentA.line === commentB.line &&
            getSanitizedBody(commentA.body) === getSanitizedBody(commentB.body) &&
            commentA.path === commentB.path);
    }
    /**
     * @description Translates a violation object into a comment
     *  with a formatted body
     * @param filePath File path that the violation took place in
     * @param violation sfdx-scanner violation
     * @param engine The engine that discovered the violation
     * @returns {} The comment that will be submitted to GitHub
     */
    translateViolationToReport(filePath, violation, engine) {
        const startLine = parseInt(violation.line);
        let endLine = violation.endLine
            ? parseInt(violation.endLine)
            : parseInt(violation.line);
        if (endLine === startLine) {
            endLine++;
        }
        const violationType = getScannerViolationType(this.inputs, violation, engine);
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
            body: this.getFormattedBody(engine, violationType, violation, filePath, commit_id),
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
    getFormattedBody(engine, violationType, violation, filePath, commit_id) {
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
    logger(message) {
        if (this.inputs.debug) {
            console.debug("Logger says: " + message);
        }
    }
}
//# sourceMappingURL=comments-reporter.js.map