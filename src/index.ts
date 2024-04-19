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

import SfScannerPullRequest from "./SfScannerPullRequest.js";

/**
 * @description Because this file is the entry point of the action, it is the first file that is executed when the
 * action is run. This function is responsible for creating an instance of the SfScannerPullRequest class and running
 * the workflow.
 */
async function main(): Promise<void> {
  console.log("#### starting main function ####");
  let scanner = new SfScannerPullRequest();
  console.log("#### created scanner, starting workflow ####");
  return await scanner.workflow();
}

/**
 * Call the bootstrapping function to run the main workflow
 */
main();
