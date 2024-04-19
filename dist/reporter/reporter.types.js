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
import { Octokit } from "@octokit/core";
import { throttling } from "@octokit/plugin-throttling";
import { retry } from "@octokit/plugin-retry";
import { paginateRest } from "@octokit/plugin-paginate-rest";
import { legacyRestEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
import { createActionAuth } from "@octokit/auth-action";
export function getCustomOctokitInstance() {
    return Octokit.plugin(throttling, paginateRest, legacyRestEndpointMethods, retry).defaults({
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
        authStrategy: createActionAuth,
        userAgent: `my-octokit-action/v1.2.3`,
    });
}
//# sourceMappingURL=reporter.types.js.map