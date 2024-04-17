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

import { getInput, setFailed } from "@actions/core";
import { context } from "@actions/github";

import { getDiffInPullRequest, GithubPullRequest } from "./git-actions";

import { SfCLI } from "./sfdxCli";

import { PluginInputs } from "./common";
import { CommentsReporter } from "./reporter/comments-reporter";
import { AnnotationsReporter } from "./reporter/annoations-reporter";
import { Reporter, ReporterProps } from "./reporter/reporter.types";
import SarifUploader from "./SarifUploader";
import {
  ScannerFinding,
  ScannerFlags,
  ScannerViolation,
} from "./sfdxCli.types";

interface ExecSyncError {
  status: string;
  stack: string;
  output?: Buffer;
  message: string;
}

class SfScannerPullRequest {
  private scannerFlags: ScannerFlags;
  private inputs: PluginInputs;
  private reporter: Reporter;
  private pullRequest: GithubPullRequest | undefined;
  private sfCli: SfCLI;

  /**
   * @description Constructor for the sfdx scanner pull request action
   */
  constructor() {
    this.scannerFlags = {
      category: getInput("category"),
      engine: getInput("engine"),
      env: getInput("eslint-env"),
      eslintconfig: getInput("eslintconfig"),
      pmdconfig: getInput("pmdconfig"),
      tsConfig: getInput("tsconfig"),
      format: "sarif", // This isn't configurable, because we use the sarif output to process the findings
      outfile: "sfdx-scan.sarif", // This could be configurable, but isn't currently
    } as ScannerFlags;

    // TODO: validate inputs. Technically the scanner's "max" violation level is 3,
    // where: 1 (high), 2 (moderate), and 3 (low)
    this.inputs = {
      reportMode: getInput("report-mode") || "check-runs",
      customPmdRules: getInput("custom-pmd-rules"),
      maxNumberOfComments: parseInt(getInput("max-number-of-comments")) || 100, // default of 100 comments
      rateLimitWaitTime: parseInt(getInput("rate-limit-wait-time")) || 60000, // default of 1 minute
      commentBatchSize: parseInt(getInput("comment-batch-size")) || 15, // default of 15 comments
      severityThreshold: parseInt(getInput("severity-threshold")) || 0,
      strictlyEnforcedRules: getInput("strictly-enforced-rules"),
      deleteResolvedComments: getInput("delete-resolved-comments") === "true",
      target: context?.payload?.pull_request ? "" : getInput("target"),
      runFlowScanner: getInput("run-flow-scanner") === "true",
      debug: getInput("debug") === "true",
      exportSarif: getInput("export-sarif") === "true",
    };

    this.pullRequest = context?.payload?.pull_request;
    this.validateContext(this.pullRequest, this.inputs.target);

    const reporterParams: ReporterProps = {
      inputs: this.inputs,
      context: context,
    };

    this.reporter =
      this.inputs.reportMode === "comments"
        ? new CommentsReporter(reporterParams)
        : new AnnotationsReporter(reporterParams);

    this.sfCli = new SfCLI(this.scannerFlags);
  }

  /**
   * @desscription validates that the execution context is a pull request, and that we have a valid target reference
   * @param pullRequest
   * @param target
   */
  private validateContext(pullRequest: GithubPullRequest, target: string) {
    console.log(
      "Validating that this action was invoked from an acceptable context..."
    );
    if (!pullRequest && !target) {
      setFailed(
        "This action is only applicable when invoked by a pull request, or with the target property supplied."
      );
    }
  }

  /**
   * @description Performs the static code analysis on the files in the temporary directory
   */
  private async performStaticCodeAnalysisOnFilesInDiff() {
    console.log(
      "Performing static code analysis on all of the relevant files..."
    );
    try {
      return await this.sfCli.scanFiles();
    } catch (err) {
      const typedErr = err as unknown as ExecSyncError;
      console.error({
        message: typedErr.message,
        status: typedErr.status,
        stack: typedErr.stack,
        output: typedErr.output?.toString().slice(-1000),
      });
      setFailed("Something went wrong when scanning the files.");
    }
    return [];
  }

  /**
   * @description Parses the findings from the sfdx scanner execution
   * and determines if any of the findings are for lines which have changed.
   * If a finding exists and covers a changed line, then translate that finding
   * object into a comment object.
   */
  private filterFindingsToDiffScope(
    findings: ScannerFinding[],
    filePathToChangedLines: Map<string, Set<number>>
  ) {
    console.log(
      "Filtering the findings to just the lines which are part of the context..."
    );

    for (let finding of findings) {
      const filePath = finding.fileName.replace(process.cwd() + "/", "");
      console.log("Processing findings for file: ", filePath);
      console.log(
        "file path to changed lines: " +
          filePathToChangedLines.get(filePath) +
          " for file: " +
          filePath
      );
      const relevantLines =
        filePathToChangedLines.get(filePath) || new Set<number>();
      for (let violation of finding.violations) {
        if (
          !this.isInChangedLines(violation, relevantLines) &&
          !this.inputs.target
        ) {
          continue;
        }
        this.reporter.translateViolationToReport(
          filePath,
          violation,
          finding.engine
        );
      }
    }
  }

  /**
   * @description Determines if all lines within a violation are within the scope of the changed lines
   * @param violation ScannerViolation representing a found violation
   * @param relevantLines Set of line numbers which have changed
   */
  private isInChangedLines(
    violation: ScannerViolation,
    relevantLines: Set<number>
  ) {
    if (!violation.endLine) {
      return relevantLines.has(parseInt(violation.line));
    }
    for (
      let i = parseInt(violation.line);
      i <= parseInt(violation.endLine);
      i++
    ) {
      if (!relevantLines.has(i)) {
        return false;
      }
    }
    return true;
  }

  /**
   * @description Constructs an array containing the file paths of the files to pass to the scanner
   * @param filePathToChangedLines Map of file paths to the lines which have changed
   * @param target The target file path to scan
   * @returns file paths to scan
   */
  private getFilesToScan(
    filePathToChangedLines: Map<string, Set<number>>,
    target: String
  ) {
    if (target) {
      return [target];
    }
    let pathsWithChangedLines = [];
    for (let [filePath, changedLines] of filePathToChangedLines) {
      if (changedLines.size > 0) {
        pathsWithChangedLines.push(filePath);
      }
    }
    return pathsWithChangedLines;
  }

  /**
   * @description Adds custom rules to the scanner's execution
   * @param rules JSON string containing the custom rules to add
   */
  private async registerCustomScannerRules(rules: string) {
    for (let rule of JSON.parse(rules) as {
      [key in string]: string;
    }[]) {
      try {
        await this.sfCli.registerRule(rule.path, rule.language);
      } catch (err) {
        const typedErr = err as unknown as ExecSyncError;
        console.error({
          message: typedErr.message,
          status: typedErr.status,
          stack: typedErr.stack,
          output: typedErr.output?.toString(),
        });
        setFailed("Something went wrong when registering custom rule.");
      }
    }
  }

  /**
   * @description The main workflow for the sfdx scanner pull request action
   */
  async workflow() {
    console.log("Beginning sf-scanner-pull-request run...");
    let filePathToChangedLines = this.inputs.target
      ? new Map<string, Set<number>>()
      : await getDiffInPullRequest(
          this.pullRequest?.base?.ref,
          this.pullRequest?.head?.ref,
          this.pullRequest?.base?.repo?.clone_url
        );
    console.log(
      "################## filePathToChangedLines: " + filePathToChangedLines
    );
    let filesToScan = this.getFilesToScan(
      filePathToChangedLines,
      this.inputs.target
    );
    if (filesToScan.length === 0) {
      console.log("There are no files to scan - exiting now.");
      return;
    }
    this.scannerFlags.target = filesToScan.join(",");
    if (this.inputs.customPmdRules) {
      await this.registerCustomScannerRules(this.inputs.customPmdRules);
    }

    let diffFindings = await this.performStaticCodeAnalysisOnFilesInDiff();
    this.filterFindingsToDiffScope(diffFindings, filePathToChangedLines);
    try {
      this.reporter.write();
    } catch (e) {
      console.error(e);
      setFailed("An error occurred while trying to write to GitHub");
    }

    if (this.inputs.exportSarif) {
      await new SarifUploader(this.scannerFlags).upload();
    }
  }
}

/**
 * @description This function exists outside the class, as a bootstrapping function to run the main workflow
 * of the sfdx scanner pull request action
 */
async function main(): Promise<void> {
  let scanner = new SfScannerPullRequest();
  await scanner.workflow();
}

/**
 * Call the bootstrapping function to run the main workflow
 */
main();
