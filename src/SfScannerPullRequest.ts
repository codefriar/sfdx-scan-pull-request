import {
  ScannerFinding,
  ScannerFlags,
  ScannerViolation,
} from "./sfdxCli.types.js";
import { PluginInputs } from "./common.js";
import { Reporter, ReporterProps } from "./reporter/reporter.types.js";
import { getDiffInPullRequest, GithubPullRequest } from "./git-actions.js";
import SfCLI from "./sfdxCli.js";
import { getInput, setFailed } from "@actions/core";
import { context } from "@actions/github";
import { CommentsReporter } from "./reporter/comments-reporter.js";
import { AnnotationsReporter } from "./reporter/annoations-reporter.js";
import { ExecSyncError } from "./index.types.js";
import SarifUploader from "./SarifUploader.js";

/**
 * @description This is the main class for the sfdx scanner pull request action.
 * Its responsibility is to execute the static code analysis on the files in the pull request, and report them back to
 * the user. It has a few different modes of operation, which are controlled by the inputs to the action.
 */
export default class SfScannerPullRequest {
  private readonly scannerFlags: ScannerFlags;
  private readonly inputs: PluginInputs;
  private reporter: Reporter;
  private readonly pullRequest: GithubPullRequest | undefined;
  private sfCli: SfCLI;

  /**
   * @description Constructor for the sfdx scanner pull request action
   */
  constructor() {
    const configFile = getInput("code-analyzer-config");
    if (!configFile) {
      setFailed("code-analyzer-config input is required");
      throw new Error("code-analyzer-config input is required");
    }

    const sarifOutputFile = getInput("sarif-output-file");
    this.scannerFlags = {
      configFile: configFile,
      outfile: sarifOutputFile || "sfca-results.sarif",
    };

    console.log(`Scanner configuration:`);
    console.log(`  - Config file: ${this.scannerFlags.configFile}`);
    console.log(`  - SARIF output: ${this.scannerFlags.outfile}`);

    /**
     * @description The inputs to the action. These are configurable by the user, and control the behavior of
     * the action.
     * They are defined as configurable in the action.yml file.
     */
    this.inputs = {
      reportMode: getInput("report-mode") || "check-runs",
      maxNumberOfComments: parseInt(getInput("max-number-of-comments")) || 100, // default of 100 comments
      rateLimitWaitTime: parseInt(getInput("rate-limit-wait-time")) || 60000, // default of 1 minute
      rateLimitRetries: parseInt(getInput("rate-limit-retries")) || 5, // default of 5 retries
      commentBatchSize: parseInt(getInput("comment-batch-size")) || 15, // default of 15 comments
      severityThreshold: this.validateThresholdInput(),
      strictlyEnforcedRules: getInput("strictly-enforced-rules"),
      deleteResolvedComments: getInput("delete-resolved-comments") === "true",
      debug: getInput("debug") === "true",
      exportSarif: getInput("export-sarif") === "true",
    };

    this.pullRequest = context?.payload?.pull_request;
    this.validateContext(this.pullRequest);

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
   * @description Validates the threshold Input to the plugin.
   */
  private validateThresholdInput(): number {
    let normalizedThreshold = parseInt(getInput("severity-threshold")) || 0;
    if (normalizedThreshold < 0) {
      console.log(
        "The severity threshold must be between 0 and 3 due to the scanner's limitations. Defaulting to 0."
      );
      normalizedThreshold = 0;
    } else if (normalizedThreshold > 3) {
      console.log(
        "The severity threshold must be between 0 and 3 due to the scanner's limitations. Defaulting to 3."
      );
      normalizedThreshold = 3;
    }
    return normalizedThreshold;
  }

  /**
   * @description validates that the execution context is a pull request
   * @param pullRequest
   */
  private validateContext(pullRequest: GithubPullRequest) {
    console.log(
      "Validating that this action was invoked from an acceptable context..."
    );
    if (!pullRequest) {
      setFailed(
        "This action is only applicable when invoked by a pull request."
      );
    }
  }

  /**
   * @description Performs the static code analysis using the Code Analyzer config file
   */
  private async performStaticCodeAnalysis() {
    console.log(
      "Performing static code analysis using Code Analyzer config file..."
    );
    try {
      return await this.sfCli.getFindingsForFiles();
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
   * @description Parses the findings from the scanner execution
   * and determines if any of the findings are for lines which have changed.
   * If a finding exists and covers a changed line, then translate that finding
   * object into a comment object.
   */
  private filterFindingsToDiffScope(
    findings: ScannerFinding[],
    filePathToChangedLines: Map<string, Set<number>>
  ) {
    console.log(
      "Filtering the findings to just the lines which are part of the changed files..."
    );

    for (let finding of findings) {
      const filePath = finding.fileName
        .replace(process.cwd() + "/", "")
        .replace("file:", "");
      const relevantLines =
        filePathToChangedLines.get(filePath) || new Set<number>();
      for (let violation of finding.violations) {
        if (!this.isInChangedLines(violation, relevantLines)) {
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
   * @description The main workflow for the sfdx scanner pull request action
   */
  async workflow() {
    console.log("Beginning sf-scanner-pull-request run...");

    // Get the diff to determine which lines changed in which files
    let filePathToChangedLines = await getDiffInPullRequest(
      this.pullRequest?.base?.ref,
      this.pullRequest?.head?.ref,
      this.pullRequest?.base?.repo?.clone_url
    );

    if (filePathToChangedLines.size === 0) {
      console.log("There are no changed files - exiting now.");
      return;
    }

    // Run the scanner on all files (config file determines what to scan)
    let allFindings = await this.performStaticCodeAnalysis();

    // Filter findings to only show violations in changed lines
    this.filterFindingsToDiffScope(allFindings, filePathToChangedLines);

    try {
      this.reporter.write();
    } catch (e) {
      console.error(JSON.stringify(e, null, 2));
      setFailed("An error occurred while trying to write to GitHub");
    }

    if (this.inputs.exportSarif) {
      await new SarifUploader(this.scannerFlags).uploadSarifFileToCodeQL();
    }
  }
}
