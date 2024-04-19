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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path = __importStar(require("path"));
const common_1 = require("./common");
/**
 * @description This class is responsible for interfacing with the Salesforce CLI.
 */
class SfCLI {
    /**
     * @description Constructor for the SfCLI class
     * @param scannerFlags the command line flags to pass to the scanner.
     */
    constructor(scannerFlags) {
        this.scannerFlags = scannerFlags;
    }
    /**
     * @description Scans the files in the target directory and returns the findings. This is the method where
     * the bulk of the work is done. It's responsible for having the Sarif file created, parsing it and returning
     * the findings in a format that can be easily consumed by the reporter.
     */
    getFindingsForFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.generateSarifOutputFile();
            if (!(0, common_1.fileExists)(this.scannerFlags.outfile)) {
                throw new Error("SARIF output file not found");
            }
            const sarifContent = fs_1.default.readFileSync(this.scannerFlags.outfile, "utf-8");
            const sarifJson = JSON.parse(sarifContent);
            const findings = [];
            sarifJson.runs.forEach((run) => {
                const rules = new Map(run.tool.driver.rules.map((rule) => [rule.id, rule]));
                const engine = run.tool.driver.name;
                const fileViolations = new Map();
                run.results.forEach((result) => {
                    var _a, _b;
                    const rule = rules.get(result.ruleId);
                    const location = result.locations[0].physicalLocation;
                    const fileName = path.normalize(location.artifactLocation.uri);
                    const violation = {
                        category: (rule === null || rule === void 0 ? void 0 : rule.properties.category) || "",
                        column: location.region.startColumn.toString(),
                        endColumn: ((_a = location.region.endColumn) === null || _a === void 0 ? void 0 : _a.toString()) || "",
                        endLine: ((_b = location.region.endLine) === null || _b === void 0 ? void 0 : _b.toString()) || "",
                        line: location.region.startLine.toString(),
                        message: result.message.text,
                        ruleName: result.ruleId,
                        severity: (rule === null || rule === void 0 ? void 0 : rule.properties.severity) || 0,
                        url: rule === null || rule === void 0 ? void 0 : rule.helpUri,
                    };
                    if (fileViolations.has(fileName)) {
                        fileViolations.get(fileName).push(violation);
                    }
                    else {
                        fileViolations.set(fileName, [violation]);
                    }
                });
                fileViolations.forEach((violations, fileName) => {
                    const finding = {
                        fileName,
                        engine,
                        violations,
                    };
                    findings.push(finding);
                });
            });
            return findings;
        });
    }
    /**
     * @description Executes a sfdx command on the command line
     * @param commandName this is the 'topic' (namespace) and 'command' (action) to execute. ie: 'scanner run'
     * @param cliArgs an array of strings to pass as arguments to the command
     */
    cli(commandName_1) {
        return __awaiter(this, arguments, void 0, function* (commandName, cliArgs = []) {
            let result = null;
            try {
                const cliCommand = `sf ${commandName} ${cliArgs.join(" ")}`;
                const jsonPaylod = (0, child_process_1.execSync)(cliCommand, {
                    maxBuffer: 10485760,
                }).toString();
                result = JSON.parse(jsonPaylod).result;
            }
            catch (err) {
                throw err;
            }
            return result;
        });
    }
    /**
     * @description uses the sf scanner to generate a .sarif file containing the scan results.
     * Sarif is a bit more verbose than the default json output, but it is more structured and has the side
     * effect of generating the output file in a format that can be easily consumed by the GitHub Security tab.
     */
    generateSarifOutputFile() {
        return __awaiter(this, void 0, void 0, function* () {
            this.scannerFlags.target = `"` + this.scannerFlags.target + `"`;
            const scannerCliArgs = Object.keys(this.scannerFlags)
                .map((key) => this.scannerFlags[key]
                ? [`--${key}`, this.scannerFlags[key]]
                : [])
                .reduce((acc, [one, two]) => (one && two ? [...acc, one, two] : acc), []);
            try {
                console.log("Executing Sf scanner on the command line");
                return yield this.cli("scanner run", [...scannerCliArgs, "--json"]);
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * @description Registers a new rule with the scanner
     * @param path The path to the rule's .jar file
     * @param language the language the rule is written for ie: apex, html, etc.
     */
    registerRule(path, language) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cli("scanner rule add", [
                `--path="${path}"`,
                `--language="${language}"`,
                "--json",
            ]);
        });
    }
}
exports.default = SfCLI;
