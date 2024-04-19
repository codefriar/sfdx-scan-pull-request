"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnotationsReporter = exports.RIGHT = exports.ERROR = void 0;
const common_1 = require("../common");
const action_1 = require("@octokit/action");
const github_1 = require("@actions/github");
const base_reporter_1 = require("./base-reporter");
exports.ERROR = "Error";
exports.RIGHT = "RIGHT";
class AnnotationsReporter extends base_reporter_1.BaseReporter {
    /**
     * @description Executes the REST request to submit the Check Run to GitHub
     * @param body
     * @private
     */
    performGithubRequest(body) {
        const octokit = new action_1.Octokit();
        const owner = github_1.context.repo.owner;
        const repo = github_1.context.repo.repo;
        const endpoint = `POST /repos/${owner}/${repo}/check-runs`;
        return octokit.request(endpoint, body);
    }
    /**
     * @description Writes the Check Run to GitHub
     */
    write() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            console.log("Creating Check Runs using GitHub REST API...");
            let conclusion;
            if (this.hasHaltingError) {
                conclusion = "failure";
            }
            else {
                conclusion = this.issues.length === 0 ? "success" : "neutral";
            }
            const commit_id = ((_a = this.context.payload) === null || _a === void 0 ? void 0 : _a.pull_request)
                ? this.context.payload.pull_request.head.sha
                : this.context.sha;
            if (this.issues) {
                const request = {
                    name: "sfdx-scanner",
                    head_sha: commit_id,
                    status: "completed",
                    conclusion: conclusion,
                    output: {
                        title: "Results from sfdx-scanner",
                        summary: `${this.issues.length} violations found`,
                        annotations: this.issues,
                    },
                };
                this.checkHasHaltingError();
                try {
                    yield this.performGithubRequest(request);
                }
                catch (error) {
                    console.error("Error when creating check run: " + JSON.stringify(error, null, 2));
                }
            }
        });
    }
    /**
     * @description Translates a violation object into a comment
     *  with a formatted body
     * @param filePath File path that the violation took place in
     * @param violation sfdx-scanner violation
     * @param engine The engine that discovered the violation
     */
    translateViolationToReport(filePath, violation, engine) {
        const violationType = (0, common_1.getScannerViolationType)(this.inputs, violation, engine);
        if (violationType === exports.ERROR) {
            this.hasHaltingError = true;
        }
        let endLine = violation.endLine
            ? parseInt(violation.endLine)
            : parseInt(violation.line);
        let startLine = parseInt(violation.line);
        if (endLine === startLine) {
            endLine++;
        }
        this.issues.push({
            path: filePath,
            start_side: exports.RIGHT,
            annotation_level: "notice",
            start_line: startLine,
            end_line: endLine,
            message: `${violation.category} ${violation.message}\n${violation.url}`,
            title: `${violation.ruleName} (sev: ${violation.severity})`,
        });
    }
}
exports.AnnotationsReporter = AnnotationsReporter;
