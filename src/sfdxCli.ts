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
import { fileExists } from "./common";

export class SfCLI {
  private scannerFlags: ScannerFlags;

  constructor(scannerFlags: ScannerFlags) {
    this.scannerFlags = scannerFlags;
  }

  async scanFiles() {
    await this.generateSarifOutputFile();
    if (!fileExists(this.scannerFlags.outfile)) {
      throw new Error("SARIF output file not found");
    }
    const inputContent = fs.readFileSync(this.scannerFlags.outfile, "utf-8");
    const inputData: InputData = JSON.parse(inputContent);
    console.log(
      "########\n INPUT DATA: \n",
      JSON.stringify(inputData, null, 2),
      "\n########"
    );
    const sarifContent = inputData.documents[0].document.document_content;
    console.log("########\n SARIF CONTENT: \n", sarifContent, "\n########");
    const sarifJson: SarifDocument = JSON.parse(sarifContent);
    console.log("########\n SARIF JSON: \n", sarifJson, "\n########");

    const findings: ScannerFinding[] = [];
    sarifJson.runs.forEach((run) => {
      const rules = new Map(
        run.tool.driver.rules.map((rule) => [rule.id, rule])
      );
      const engine = run.tool.driver.name;

      const fileViolations = new Map<string, ScannerViolation[]>();
      console.log("Preparing to iterate over run results");
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
    console.log("Findings: ", findings);
    return findings;
  }

  private async cli<T>(commandName: string, cliArgs: string[] = []) {
    let result = null as T;
    try {
      const cliCommand = `sf ${commandName} ${cliArgs.join(" ")}`;
      console.log("Executing command: ", cliCommand);
      const jsonPaylod = execSync(cliCommand, {
        maxBuffer: 10485760,
      }).toString();
      // console.log("Json Payload: " + jsonPaylod);
      result = (JSON.parse(jsonPaylod) as SfdxCommandResult<T>).result;
      // console.log("Result: " + result);
      //
      // result = (
      //   JSON.parse(
      //     execSync(cliCommand, { maxBuffer: 10485760 }).toString()
      //   ) as SfdxCommandResult<T>
      // ).result;
    } catch (err) {
      throw err;
    }
    return result;
  }

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
      const cliRunResults = await this.cli("scanner run", [
        ...scannerCliArgs,
        "--json",
      ]);
      console.log("cliRunResults: ", cliRunResults);
      return cliRunResults;
    } catch (err) {
      throw err;
    }
  }

  async registerRule(path: string, language: string) {
    return this.cli<ScannerFinding[] | string>("scanner rule add", [
      `--path="${path}"`,
      `--language="${language}"`,
      "--json",
    ]);
  }
}

export type ScannerFinding = {
  fileName: string;
  engine: string;
  violations: ScannerViolation[];
};

export type ScannerFlags = {
  category?: string;
  engine?: string;
  env?: string;
  eslintconfig?: string;
  pmdconfig?: string;
  target: string;
  tsConfig?: string;
  exportSarif?: boolean;
  format: string;
  outfile: string;
};

export type ScannerViolation = {
  category: string;
  column: string;
  endColumn: string;
  endLine: string;
  line: string;
  message: string;
  ruleName: string;
  severity: number;
  url?: string;
};

interface SarifResult {
  ruleId: string;
  message: { text: string };
  locations: {
    physicalLocation: {
      artifactLocation: {
        uri: string;
      };
      region: {
        startLine: number;
        startColumn: number;
        endLine?: number;
        endColumn?: number;
      };
    };
  }[];
}

interface SarifRule {
  id: string;
  properties: { category: string; severity: number };
  helpUri?: string;
}

interface SarifTool {
  driver: {
    name: string;
    rules: SarifRule[];
  };
}

interface SarifRun {
  tool: SarifTool;
  results: SarifResult[];
}

interface SarifDocument {
  runs: SarifRun[];
}

interface InputData {
  documents: {
    document: {
      document_content: string;
    };
  }[];
}

export type ScannerViolationType = "Error" | "Warning";

type SfdxCommandResult<T> = {
  status: 1 | 0;
  result: T;
};
