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

import parse from "parse-diff";
import fs from "fs";
import { context } from "@actions/github";
import { execSync } from "child_process";

const DIFF_OUTPUT = "diffBetweenCurrentAndParentBranch.txt";

export type GithubPullRequest = typeof context.payload.pull_request | undefined;

/**
 * @description Calculates the diff for all files within the pull request and
 * populates a map of filePath -> Set of changed line numbers
 */
export async function getDiffInPullRequest(
  baseRef: string,
  headRef: string,
  destination?: string
) {
  console.log("Getting difference within the pull request ...", {
    baseRef,
    headRef,
  });
  console.log("Destination: ", destination);
  if (destination) {
    execSync(`git remote add -f destination ${destination} 2>&1`);
    console.log("Calling git remote update ");
    execSync(`git remote update 2>&1`);
    console.log("Finished calling git remote update");
  }

  console.log(
    "Fetching diff between base and head ref ..." + baseRef + " " + headRef
  );

  /**
   * Keeping git diff output in memory throws `code: 'ENOBUFS'`  error when
   * called from within action. Writing to file, then reading avoids this error.
   */
  console.log("#### starting git diff");
  console.log(
    `git diff command: git diff "destination/${baseRef}"..."origin/${headRef}"`
  );
  execSync(`git diff "destination/${baseRef}"..."origin/${headRef}"`, {
    maxBuffer: 1024 * 1024 * 1024,
  });
  console.log("#### finished git diff");
  execSync(
    `git diff "destination/${baseRef}"..."origin/${headRef}" > ${DIFF_OUTPUT}`
  );
  console.log("Diff output::");

  execSync(`ls -lah diffBetweenCurrentAndParentBranch.txt; cat ${DIFF_OUTPUT}`);
  const files = parse(fs.readFileSync(DIFF_OUTPUT).toString());
  const filePathToChangedLines = new Map<string, Set<number>>();
  for (let file of files) {
    if (file.to && file.to !== "/dev/null") {
      const changedLines = new Set<number>();
      for (let chunk of file.chunks) {
        for (let change of chunk.changes) {
          if (change.type === "add" || change.type === "del") {
            changedLines.add(change.ln);
          }
        }
      }
      filePathToChangedLines.set(file.to, changedLines);
    }
  }
  return filePathToChangedLines;
}
