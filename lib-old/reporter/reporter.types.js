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
exports.getCustomOctokitInstance = void 0;
const core_1 = require("@octokit/core");
const plugin_throttling_1 = require("@octokit/plugin-throttling");
const plugin_retry_1 = require("@octokit/plugin-retry");
const plugin_paginate_rest_1 = require("@octokit/plugin-paginate-rest");
const plugin_rest_endpoint_methods_1 = require("@octokit/plugin-rest-endpoint-methods");
const auth_action_1 = require("@octokit/auth-action");
function getCustomOctokitInstance() {
    return core_1.Octokit.plugin(plugin_throttling_1.throttling, plugin_paginate_rest_1.paginateRest, plugin_rest_endpoint_methods_1.legacyRestEndpointMethods, plugin_retry_1.retry).defaults({
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
}
exports.getCustomOctokitInstance = getCustomOctokitInstance;
