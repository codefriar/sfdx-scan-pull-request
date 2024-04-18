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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseReporter = void 0;
const common_1 = require("../common");
const sfdxCli_types_1 = require("../sfdxCli.types");
const context_1 = require("@actions/github/lib/context");
const core_1 = require("@actions/core");
const core_2 = require("@octokit/core");
const plugin_throttling_1 = require("@octokit/plugin-throttling");
const plugin_retry_1 = require("@octokit/plugin-retry");
const plugin_paginate_rest_1 = require("@octokit/plugin-paginate-rest");
const plugin_rest_endpoint_methods_1 = require("@octokit/plugin-rest-endpoint-methods");
const auth_action_1 = require("@octokit/auth-action");
const MyOctokit = core_2.Octokit.plugin(plugin_throttling_1.throttling, plugin_paginate_rest_1.paginateRest, plugin_rest_endpoint_methods_1.legacyRestEndpointMethods, plugin_retry_1.retry).defaults({
    throttle: {
        onRateLimit: (retryAfter, options) => {
            console.warn(`Request quota exhausted for request ${options.method} ${options.url}. Retrying after ${retryAfter} seconds!`);
            return true;
        },
        onSecondaryRateLimit: (retryAfter, options) => {
            console.warn(`Secondary rate limit detected for request ${options.method} ${options.url}`);
            if (options.request.retryCount <= 5) {
                console.log(`Retrying after ${retryAfter} seconds!`);
                return true;
            }
            return false;
        },
    },
    authStrategy: auth_action_1.createActionAuth,
    userAgent: `my-octokit-action/v1.2.3`,
});
// function buildDefaults(options: OctokitOptions): OctokitOptions {
//   return {
//     authStrategy: createActionAuth,
//     baseUrl: process.env["GITHUB_API_URL"] || "https://api.github.com",
//     userAgent: `octokit-action.js/${VERSION}`,
//     ...options,
//     request: {
//       fetch: customFetch,
//       ...options.request,
//     },
//   };
// });
class BaseReporter {
    memoizedOctokit = null;
    hasHaltingError;
    inputs;
    issues;
    context;
    constructor({ context, inputs }) {
        this.hasHaltingError = false;
        this.issues = [];
        this.context = context;
        this.inputs = inputs;
    }
    get octokit() {
        if (this.memoizedOctokit === null) {
            // Compute the value if it hasn't been memoized yet
            this.memoizedOctokit = this.getMemoizedOctokit();
        }
        return this.memoizedOctokit;
    }
    /**
     * @description This is a workaround for octokit/actions not supporting additional plugins.
     * octokit/actions is octokit/core with paginateRest and legacyRestEndpointMethods plugins.
     * This custom version includes the throttling plugin.
     */
    getMemoizedOctokit() {
        return new MyOctokit();
    }
    write() {
        throw new Error("Method not implemented.");
    }
    translateViolationToReport(_filePath, _violation, _engine) {
        throw new Error("Method not implemented.");
    }
    checkHasHaltingError() {
        if (this.hasHaltingError) {
            (0, core_1.setFailed)("One or more errors have been identified within the structure of the code that will need to be resolved before continuing.");
        }
    }
}
exports.BaseReporter = BaseReporter;
