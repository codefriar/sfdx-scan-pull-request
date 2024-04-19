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
import parse from "parse-diff";
import fs from "fs";
import { execSync } from "child_process";
const DIFF_OUTPUT = "diffBetweenCurrentAndParentBranch.txt";
/**
 * @description Calculates the diff for all files within the pull request and
 * populates a map of filePath -> Set of changed line numbers
 */
export function getDiffInPullRequest(baseRef, headRef, destination) {
    return __awaiter(this, void 0, void 0, function* () {
        if (destination) {
            execSync(`git remote add -f destination ${destination} 2>&1`);
            execSync(`git remote update 2>&1`);
        }
        /**
         * Keeping git diff output in memory throws `code: 'ENOBUFS'`  error when
         * called from within action. Writing to file, then reading avoids this error.
         */
        execSync(`git diff "destination/${baseRef}"..."origin/${headRef}" > ${DIFF_OUTPUT}`);
        const files = parse(fs.readFileSync(DIFF_OUTPUT).toString());
        const filePathToChangedLines = new Map();
        for (let file of files) {
            if (file.to && file.to !== "/dev/null") {
                const changedLines = new Set();
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
    });
}
//# sourceMappingURL=git-actions.js.map