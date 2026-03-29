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
import { execFileSync } from "child_process";

const DIFF_OUTPUT = "diffBetweenCurrentAndParentBranch.txt";

export type GithubPullRequest = typeof context.payload.pull_request | undefined;

/**
 * @description Sanitizes a string for use as a git ref by removing
 * characters that could be used for shell injection.
 */
function sanitizeRef(ref: string): string {
  return ref.replace(/[^a-zA-Z0-9_./-]/g, "");
}

/**
 * @description Calculates the diff for all files within the pull request and
 * populates a map of filePath -> Set of changed line numbers
 */
export async function getDiffInPullRequest(
  baseRef: string,
  headRef: string,
  destination?: string
) {
  const safeBaseRef = sanitizeRef(baseRef);
  const safeHeadRef = sanitizeRef(headRef);

  if (destination) {
    execFileSync("git", ["remote", "add", "-f", "destination", destination], {
      stdio: "pipe",
    });
    execFileSync("git", ["remote", "update"], { stdio: "pipe" });
  }

  /**
   * Keeping git diff output in memory throws `code: 'ENOBUFS'`  error when
   * called from within action. Writing to file, then reading avoids this error.
   */
  const diffOutput = execFileSync("git", [
    "diff",
    `destination/${safeBaseRef}...origin/${safeHeadRef}`,
  ]);
  fs.writeFileSync(DIFF_OUTPUT, diffOutput);

  const files = parse(fs.readFileSync(DIFF_OUTPUT).toString());
  const filePathToChangedLines = new Map<string, Set<number>>();
  for (const file of files) {
    if (file.to && file.to !== "/dev/null") {
      const changedLines = new Set<number>();
      for (const chunk of file.chunks) {
        for (const change of chunk.changes) {
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
