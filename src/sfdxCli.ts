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
   * @description Scans the files using the Code Analyzer config file and returns the findings.
   * This method runs the scanner to generate a SARIF file, then parses it and returns
   * the findings in a format that can be easily consumed by the reporter.
   */
  async getFindingsForFiles() {
    await this.runCodeAnalyzer();
    if (!fileExists(this.scannerFlags.outfile)) {
      throw new Error("SARIF output file not found");
    }
    return this.parseSarifFile();
  }

  /**
   * @description Parses the SARIF file and converts it to ScannerFinding objects
   */
  private parseSarifFile(): ScannerFinding[] {
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
   * @description Runs the sf code-analyzer using the config file approach
   * This generates a SARIF file at the specified output location
   */
  private async runCodeAnalyzer() {
    try {
      console.log("Executing sf code-analyzer with config file...");
      const cliCommand = `sf code-analyzer run -c "${this.scannerFlags.configFile}" -f "${this.scannerFlags.outfile}"`;
      console.log(`Running command: ${cliCommand}`);
      execSync(cliCommand, {
        maxBuffer: 10485760,
        stdio: 'inherit'
      });
      console.log("Code analyzer execution completed successfully");
    } catch (err) {
      console.error("Error running code analyzer:", err);
      throw err;
    }
  }
}
