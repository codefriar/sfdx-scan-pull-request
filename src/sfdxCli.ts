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

import { execSync } from "child_process";
import fs from "fs";
import * as path from "path";
import { fileExists } from "./common.js";
import {
  ScannerFinding,
  ScannerFlags,
  ScannerViolation,
  SfdxCommandResult,
} from "./sfdxCli.types.js";
import { SarifDocument } from "./sarif.types.js";

/**
 * @description This class is responsible for interfacing with the Salesforce CLI.
 */
export default class SfCLI {
  private scannerFlags: ScannerFlags;

  /**
   * @description Constructor for the SfCLI class
   * @param scannerFlags the command line flags to pass to the scanner.
   */
  constructor(scannerFlags: ScannerFlags) {
    this.scannerFlags = scannerFlags;
  }

  /**
   * @description Scans the files in the target directory and returns the findings. This is the method where
   * the bulk of the work is done. It's responsible for having the Sarif file created, parsing it and returning
   * the findings in a format that can be easily consumed by the reporter.
   */
  async getFindingsForFiles() {
    await this.generateSarifOutputFile();
    if (!fileExists(this.scannerFlags.outfile)) {
      throw new Error("SARIF output file not found");
    }
    const sarifContent = fs.readFileSync(this.scannerFlags.outfile, "utf-8");
    const sarifJson: SarifDocument = JSON.parse(sarifContent) as SarifDocument;

    const findings: ScannerFinding[] = [];
    sarifJson.runs.forEach((run) => {
      const rules = new Map(
        run.tool.driver.rules.map((rule) => [rule.id, rule])
      );
      const engine = run.tool.driver.name;

      const fileViolations = new Map<string, ScannerViolation[]>();
      run.results.forEach((result) => {
        const rule = rules.get(result.ruleId);
        const location = result.locations[0].physicalLocation;
        const fileName = path.normalize(location.artifactLocation.uri);

        const violation: ScannerViolation = {
          category: rule?.properties.category || "",
          column: location.region.startColumn.toString(),
          endColumn: location.region.endColumn?.toString() || "",
          endLine: location.region.endLine?.toString() || "",
          line: location.region.startLine.toString(),
          message: result.message.text,
          ruleName: result.ruleId,
          severity: rule?.properties.severity || 0,
          url: rule?.helpUri,
        };

        if (fileViolations.has(fileName)) {
          fileViolations.get(fileName)!.push(violation);
        } else {
          fileViolations.set(fileName, [violation]);
        }
      });

      fileViolations.forEach((violations, fileName) => {
        const finding: ScannerFinding = {
          fileName,
          engine,
          violations,
        };

        findings.push(finding);
      });
    });
    return findings;
  }

  /**
   * @description Executes a sfdx command on the command line
   * @param commandName this is the 'topic' (namespace) and 'command' (action) to execute. ie: 'scanner run'
   * @param cliArgs an array of strings to pass as arguments to the command
   */
  private async cli<T>(commandName: string, cliArgs: string[] = []) {
    let result = null as T;
    try {
      const cliCommand = `sf ${commandName} ${cliArgs.join(" ")}`;
      const jsonPayload = execSync(cliCommand, {
        maxBuffer: 10485760,
      }).toString();
      result = (JSON.parse(jsonPayload) as SfdxCommandResult<T>).result;
    } catch (err) {
      throw err;
    }
    return result;
  }

  /**
   * @description uses the sf scanner to generate a .sarif file containing the scan results.
   * Sarif is a bit more verbose than the default json output, but it is more structured and has the side
   * effect of generating the output file in a format that can be easily consumed by the GitHub Security tab.
   */
  private async generateSarifOutputFile() {
    this.scannerFlags.target = `"` + this.scannerFlags.target + `"`;
    const scannerCliArgs = (
      Object.keys(this.scannerFlags) as Array<keyof ScannerFlags>
    )
      .map<string[]>((key) =>
        this.scannerFlags[key]
          ? ([`--${key}`, this.scannerFlags[key]] as string[])
          : []
      )
      .reduce((acc, [one, two]) => (one && two ? [...acc, one, two] : acc), []);
    try {
      console.log("Executing Sf scanner on the command line");
      return await this.cli("scanner run", [...scannerCliArgs, "--json"]);
    } catch (err) {
      throw err;
    }
  }

  /**
   * @description Registers a new rule with the scanner
   * @param path The path to the rule's .jar file
   * @param language the language the rule is written for ie: apex, html, etc.
   */
  async registerRule(path: string, language: string) {
    return this.cli<ScannerFinding[] | string>("scanner rule add", [
      `--path="${path}"`,
      `--language="${language}"`,
      "--json",
    ]);
  }
}
