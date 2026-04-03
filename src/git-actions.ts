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
 * Information about changed lines in a file, including which hunk they belong to
 */
export type DiffInfo = {
  changedLines: Set<number>;
  lineToHunk: Map<number, number>; // Maps line number to hunk index
};

/**
 * @description Calculates the diff for all files within the pull request and
 * populates a map of filePath -> DiffInfo with changed line numbers and hunk info
 */
export async function getDiffInPullRequest(
  baseRef: string,
  headRef: string,
  destination?: string,
  debug: boolean = false
) {
  if (destination) {
    execFileSync("git", ["remote", "add", "-f", "destination", destination], {
      stdio: ["ignore", "pipe", "pipe"],
    });
    execFileSync("git", ["remote", "update"], {
      stdio: ["ignore", "pipe", "pipe"],
    });
  }

  /**
   * Keeping git diff output in memory throws `code: 'ENOBUFS'`  error when
   * called from within action. Writing to file, then reading avoids this error.
   */
  const diffOutput = execFileSync(
    "git",
    ["diff", `destination/${baseRef}...origin/${headRef}`],
    { maxBuffer: 10485760 }
  );
  fs.writeFileSync(DIFF_OUTPUT, diffOutput);

  const files = parse(fs.readFileSync(DIFF_OUTPUT).toString());
  const filePathToDiffInfo = new Map<string, DiffInfo>();

  if (debug) {
    console.log(`DEBUG: Parsing diff for ${files.length} files`);
  }

  for (let file of files) {
    if (file.to && file.to !== "/dev/null") {
      const changedLines = new Set<number>();
      const lineToHunk = new Map<number, number>();

      file.chunks.forEach((chunk, hunkIndex) => {
        for (let change of chunk.changes) {
          if (change.type === "add") {
            changedLines.add(change.ln);
            lineToHunk.set(change.ln, hunkIndex);
          }
        }
      });

      if (debug) {
        console.log(`DEBUG: File ${file.to} has ${changedLines.size} changed lines: ${Array.from(changedLines).sort((a, b) => a - b).join(', ')}`);
      }
      filePathToDiffInfo.set(file.to, { changedLines, lineToHunk });
    }
  }
  return filePathToDiffInfo;
}
