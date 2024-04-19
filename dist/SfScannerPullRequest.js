import { getDiffInPullRequest } from "./git-actions.js";
import SfCLI from "./sfdxCli.js";
import { getInput, setFailed } from "@actions/core";
import { context } from "@actions/github";
import { CommentsReporter } from "./reporter/comments-reporter.js";
import { AnnotationsReporter } from "./reporter/annoations-reporter.js";
import SarifUploader from "./SarifUploader.js";
/**
 * @description This is the main class for the sfdx scanner pull request action.
 * Its responsibility is to execute the static code analysis on the files in the pull request, and report them back to
 * the user. It has a few different modes of operation, which are controlled by the inputs to the action.
 */
export default class SfScannerPullRequest {
    scannerFlags;
    inputs;
    reporter;
    pullRequest;
    sfCli;
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
        };
        /**
         * @description The inputs to the action. These are configurable by the user, and control the behavior of
         * the action.
         * They are defined as configurable in the action.yml file.
         */
        this.inputs = {
            reportMode: getInput("report-mode") || "check-runs",
            customPmdRules: getInput("custom-pmd-rules"),
            maxNumberOfComments: parseInt(getInput("max-number-of-comments")) || 100, // default of 100 comments
            rateLimitWaitTime: parseInt(getInput("rate-limit-wait-time")) || 60000, // default of 1 minute
            rateLimitRetries: parseInt(getInput("rate-limit-retries")) || 5, // default of 5 retries
            commentBatchSize: parseInt(getInput("comment-batch-size")) || 15, // default of 15 comments
            severityThreshold: this.validateThresholdInput(),
            strictlyEnforcedRules: getInput("strictly-enforced-rules"),
            deleteResolvedComments: getInput("delete-resolved-comments") === "true",
            target: context?.payload?.pull_request ? "" : getInput("target"),
            runFlowScanner: getInput("run-flow-scanner") === "true",
            debug: getInput("debug") === "true",
            exportSarif: getInput("export-sarif") === "true",
        };
        this.pullRequest = context?.payload?.pull_request;
        this.validateContext(this.pullRequest, this.inputs.target);
        const reporterParams = {
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
    validateThresholdInput() {
        let normalizedThreshold = parseInt(getInput("severity-threshold")) || 0;
        if (normalizedThreshold < 0) {
            console.log("The severity threshold must be between 0 and 3 due to the scanner's limitations. Defaulting to 0.");
            normalizedThreshold = 0;
        }
        else if (normalizedThreshold > 3) {
            console.log("The severity threshold must be between 0 and 3 due to the scanner's limitations. Defaulting to 3.");
            normalizedThreshold = 3;
        }
        return normalizedThreshold;
    }
    /**
     * @desscription validates that the execution context is a pull request, and that we have a valid target reference
     * @param pullRequest
     * @param target
     */
    validateContext(pullRequest, target) {
        console.log("Validating that this action was invoked from an acceptable context...");
        if (!pullRequest && !target) {
            setFailed("This action is only applicable when invoked by a pull request, or with the target property supplied.");
        }
    }
    /**
     * @description Performs the static code analysis on the files in the temporary directory
     */
    async performStaticCodeAnalysisOnFilesInDiff() {
        console.log("Performing static code analysis on all of the relevant files...");
        try {
            return await this.sfCli.getFindingsForFiles();
        }
        catch (err) {
            const typedErr = err;
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
    filterFindingsToDiffScope(findings, filePathToChangedLines) {
        console.log("Filtering the findings to just the lines which are part of the context...");
        for (let finding of findings) {
            const filePath = finding.fileName
                .replace(process.cwd() + "/", "")
                .replace("file:", "");
            const relevantLines = filePathToChangedLines.get(filePath) || new Set();
            for (let violation of finding.violations) {
                if (!this.isInChangedLines(violation, relevantLines) &&
                    !this.inputs.target) {
                    continue;
                }
                this.reporter.translateViolationToReport(filePath, violation, finding.engine);
            }
        }
    }
    /**
     * @description Determines if all lines within a violation are within the scope of the changed lines
     * @param violation ScannerViolation representing a found violation
     * @param relevantLines Set of line numbers which have changed
     */
    isInChangedLines(violation, relevantLines) {
        if (!violation.endLine) {
            return relevantLines.has(parseInt(violation.line));
        }
        for (let i = parseInt(violation.line); i <= parseInt(violation.endLine); i++) {
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
    getFilesToScan(filePathToChangedLines, target) {
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
    async registerCustomScannerRules(rules) {
        for (let rule of JSON.parse(rules)) {
            try {
                await this.sfCli.registerRule(rule.path, rule.language);
            }
            catch (err) {
                const typedErr = err;
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
            ? new Map()
            : await getDiffInPullRequest(this.pullRequest?.base?.ref, this.pullRequest?.head?.ref, this.pullRequest?.base?.repo?.clone_url);
        let filesToScan = this.getFilesToScan(filePathToChangedLines, this.inputs.target);
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
        }
        catch (e) {
            console.error(e);
            setFailed("An error occurred while trying to write to GitHub");
        }
        if (this.inputs.exportSarif) {
            await new SarifUploader(this.scannerFlags).uploadSarifFileToCodeQL();
        }
    }
}
//# sourceMappingURL=SfScannerPullRequest.js.map