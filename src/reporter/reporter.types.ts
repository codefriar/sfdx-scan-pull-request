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

import { PluginInputs } from "../common";
import { ScannerViolation } from "../sfdxCli.types";
import { Context } from "@actions/github/lib/context";
import { Octokit } from "@octokit/core";
import { throttling } from "@octokit/plugin-throttling";
import { retry } from "@octokit/plugin-retry";
import { paginateRest, PaginateInterface } from "@octokit/plugin-paginate-rest";
import { legacyRestEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
import { createActionAuth } from "@octokit/auth-action";
import { RequestError } from "@octokit/request-error";

export type CustomOctokitWithPlugins = Octokit & {
  paginate: PaginateInterface;
} & {
  legacyRestEndpointMethods: {
    retry: {
      retryRequest: (
        error: RequestError,
        retries: number,
        retryAfter: number
      ) => RequestError;
    };
  };
};

export function getCustomOctokitInstance(): CustomOctokitWithPlugins {
  return Octokit.plugin(
    throttling,
    paginateRest,
    legacyRestEndpointMethods,
    retry
  ).defaults({
    throttle: {
      onRateLimit: (retryAfter, options) => {
        console.warn(
          `Request quota exhausted for request ${options.method} ${options.url}. Retrying after ${retryAfter} seconds!`
        );
        return true;
      },
      onSecondaryRateLimit: (retryAfter, options) => {
        console.warn(
          `Secondary rate limit detected for request ${options.method} ${options.url}`
        );
        if (options.request.retryCount <= 5) {
          console.log(`Retrying after ${retryAfter} seconds!`);
          return true;
        }
        return false;
      },
    },
    authStrategy: createActionAuth,
    userAgent: `my-octokit-action/v1.2.3`,
  }) as unknown as CustomOctokitWithPlugins;
}

export type GithubCheckRun = {
  name: string;
  head_sha: string;
  status: string; // add
  conclusion:
    | "action_required"
    | "cancelled"
    | "failure"
    | "neutral"
    | "success"
    | "skipped"
    | "stale"
    | "timed_out";
  output: {
    title: string;
    summary: string;
    annotations: GithubAnnotation[];
  };
};

export type GithubAnnotation = {
  path: string;
  start_side: string;
  annotation_level: "notice"; // add,
  start_line: number;
  end_line: number;
  message: string;
  title: string;
};

export type GithubComment = {
  commit_id: string;
  path: string;
  start_line: number;
  start_side: GithubCommentSide;
  side: GithubCommentSide;
  line: number;
  body: string;
  url?: string;
};

export type GithubExistingComment = GithubComment & {
  user: {
    type: "Bot" | "User";
  };
  id?: string;
};

export type ReporterProps = {
  context: Context;
  inputs: PluginInputs;
};

export interface Reporter {
  write(): void;
  translateViolationToReport(
    filePath: string,
    violation: ScannerViolation,
    engine: string
  ): void;
}

type GithubCommentSide = "RIGHT";
