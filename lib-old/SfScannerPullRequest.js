"use strict";
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
const git_actions_1 = require("./git-actions");
const sfdxCli_1 = __importDefault(require("./sfdxCli"));
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
const comments_reporter_1 = require("./reporter/comments-reporter");
const annoations_reporter_1 = require("./reporter/annoations-reporter");
const SarifUploader_1 = __importDefault(require("./SarifUploader"));
/**
 * @description This is the main class for the sfdx scanner pull request action.
 * Its responsibility is to execute the static code analysis on the files in the pull request, and report them back to
 * the user. It has a few different modes of operation, which are controlled by the inputs to the action.
 */
class SfScannerPullRequest {
    /**
     * @description Constructor for the sfdx scanner pull request action
     */
    constructor() {
        var _a, _b;
        this.scannerFlags = {
            category: (0, core_1.getInput)("category"),
            engine: (0, core_1.getInput)("engine"),
            env: (0, core_1.getInput)("eslint-env"),
            eslintconfig: (0, core_1.getInput)("eslintconfig"),
            pmdconfig: (0, core_1.getInput)("pmdconfig"),
            tsConfig: (0, core_1.getInput)("tsconfig"),
            format: "sarif", // This isn't configurable, because we use the sarif output to process the findings
            outfile: "sfdx-scan.sarif", // This could be configurable, but isn't currently
        };
        /**
         * @description The inputs to the action. These are configurable by the user, and control the behavior of
         * the action.
         * They are defined as configurable in the action.yml file.
         */
        this.inputs = {
            reportMode: (0, core_1.getInput)("report-mode") || "check-runs",
            customPmdRules: (0, core_1.getInput)("custom-pmd-rules"),
            maxNumberOfComments: parseInt((0, core_1.getInput)("max-number-of-comments")) || 100, // default of 100 comments
            rateLimitWaitTime: parseInt((0, core_1.getInput)("rate-limit-wait-time")) || 60000, // default of 1 minute
            rateLimitRetries: parseInt((0, core_1.getInput)("rate-limit-retries")) || 5, // default of 5 retries
            commentBatchSize: parseInt((0, core_1.getInput)("comment-batch-size")) || 15, // default of 15 comments
            severityThreshold: this.validateThresholdInput(),
            strictlyEnforcedRules: (0, core_1.getInput)("strictly-enforced-rules"),
            deleteResolvedComments: (0, core_1.getInput)("delete-resolved-comments") === "true",
            target: ((_a = github_1.context === null || github_1.context === void 0 ? void 0 : github_1.context.payload) === null || _a === void 0 ? void 0 : _a.pull_request) ? "" : (0, core_1.getInput)("target"),
            runFlowScanner: (0, core_1.getInput)("run-flow-scanner") === "true",
            debug: (0, core_1.getInput)("debug") === "true",
            exportSarif: (0, core_1.getInput)("export-sarif") === "true",
        };
        this.pullRequest = (_b = github_1.context === null || github_1.context === void 0 ? void 0 : github_1.context.payload) === null || _b === void 0 ? void 0 : _b.pull_request;
        this.validateContext(this.pullRequest, this.inputs.target);
        const reporterParams = {
            inputs: this.inputs,
            context: github_1.context,
        };
        this.reporter =
            this.inputs.reportMode === "comments"
                ? new comments_reporter_1.CommentsReporter(reporterParams)
                : new annoations_reporter_1.AnnotationsReporter(reporterParams);
        this.sfCli = new sfdxCli_1.default(this.scannerFlags);
    }
    /**
     * @description Validates the threshold Input to the plugin.
     */
    validateThresholdInput() {
        let normalizedThreshold = parseInt((0, core_1.getInput)("severity-threshold")) || 0;
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
            (0, core_1.setFailed)("This action is only applicable when invoked by a pull request, or with the target property supplied.");
        }
    }
    /**
     * @description Performs the static code analysis on the files in the temporary directory
     */
    performStaticCodeAnalysisOnFilesInDiff() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            console.log("Performing static code analysis on all of the relevant files...");
            try {
                return yield this.sfCli.getFindingsForFiles();
            }
            catch (err) {
                const typedErr = err;
                console.error({
                    message: typedErr.message,
                    status: typedErr.status,
                    stack: typedErr.stack,
                    output: (_a = typedErr.output) === null || _a === void 0 ? void 0 : _a.toString().slice(-1000),
                });
                (0, core_1.setFailed)("Something went wrong when scanning the files.");
            }
            return [];
        });
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
    registerCustomScannerRules(rules) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            for (let rule of JSON.parse(rules)) {
                try {
                    yield this.sfCli.registerRule(rule.path, rule.language);
                }
                catch (err) {
                    const typedErr = err;
                    console.error({
                        message: typedErr.message,
                        status: typedErr.status,
                        stack: typedErr.stack,
                        output: (_a = typedErr.output) === null || _a === void 0 ? void 0 : _a.toString(),
                    });
                    (0, core_1.setFailed)("Something went wrong when registering custom rule.");
                }
            }
        });
    }
    /**
     * @description The main workflow for the sfdx scanner pull request action
     */
    workflow() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g;
            console.log("Beginning sf-scanner-pull-request run...");
            let filePathToChangedLines = this.inputs.target
                ? new Map()
                : yield (0, git_actions_1.getDiffInPullRequest)((_b = (_a = this.pullRequest) === null || _a === void 0 ? void 0 : _a.base) === null || _b === void 0 ? void 0 : _b.ref, (_d = (_c = this.pullRequest) === null || _c === void 0 ? void 0 : _c.head) === null || _d === void 0 ? void 0 : _d.ref, (_g = (_f = (_e = this.pullRequest) === null || _e === void 0 ? void 0 : _e.base) === null || _f === void 0 ? void 0 : _f.repo) === null || _g === void 0 ? void 0 : _g.clone_url);
            let filesToScan = this.getFilesToScan(filePathToChangedLines, this.inputs.target);
            if (filesToScan.length === 0) {
                console.log("There are no files to scan - exiting now.");
                return;
            }
            this.scannerFlags.target = filesToScan.join(",");
            if (this.inputs.customPmdRules) {
                yield this.registerCustomScannerRules(this.inputs.customPmdRules);
            }
            let diffFindings = yield this.performStaticCodeAnalysisOnFilesInDiff();
            this.filterFindingsToDiffScope(diffFindings, filePathToChangedLines);
            try {
                this.reporter.write();
            }
            catch (e) {
                console.error(e);
                (0, core_1.setFailed)("An error occurred while trying to write to GitHub");
            }
            if (this.inputs.exportSarif) {
                yield new SarifUploader_1.default(this.scannerFlags).uploadSarifFileToCodeQL();
            }
        });
    }
}
exports.default = SfScannerPullRequest;
