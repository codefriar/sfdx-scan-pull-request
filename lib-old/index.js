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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SfScannerPullRequest_1 = __importDefault(require("./SfScannerPullRequest"));
/**
 * @description Because this file is the entry point of the action, it is the first file that is executed when the
 * action is run. This function is responsible for creating an instance of the SfScannerPullRequest class and running
 * the workflow.
 */
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("#### starting main function ####");
        let scanner = new SfScannerPullRequest_1.default();
        console.log("#### created scanner, starting workflow ####");
        return yield scanner.workflow();
    });
}
/**
 * Call the bootstrapping function to run the main workflow
 */
main();
