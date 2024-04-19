/**
 * @description This is the main class for the sfdx scanner pull request action.
 * Its responsibility is to execute the static code analysis on the files in the pull request, and report them back to
 * the user. It has a few different modes of operation, which are controlled by the inputs to the action.
 */
export default class SfScannerPullRequest {
    private readonly scannerFlags;
    private readonly inputs;
    private reporter;
    private readonly pullRequest;
    private sfCli;
    /**
     * @description Constructor for the sfdx scanner pull request action
     */
    constructor();
    /**
     * @description Validates the threshold Input to the plugin.
     */
    private validateThresholdInput;
    /**
     * @desscription validates that the execution context is a pull request, and that we have a valid target reference
     * @param pullRequest
     * @param target
     */
    private validateContext;
    /**
     * @description Performs the static code analysis on the files in the temporary directory
     */
    private performStaticCodeAnalysisOnFilesInDiff;
    /**
     * @description Parses the findings from the sfdx scanner execution
     * and determines if any of the findings are for lines which have changed.
     * If a finding exists and covers a changed line, then translate that finding
     * object into a comment object.
     */
    private filterFindingsToDiffScope;
    /**
     * @description Determines if all lines within a violation are within the scope of the changed lines
     * @param violation ScannerViolation representing a found violation
     * @param relevantLines Set of line numbers which have changed
     */
    private isInChangedLines;
    /**
     * @description Constructs an array containing the file paths of the files to pass to the scanner
     * @param filePathToChangedLines Map of file paths to the lines which have changed
     * @param target The target file path to scan
     * @returns file paths to scan
     */
    private getFilesToScan;
    /**
     * @description Adds custom rules to the scanner's execution
     * @param rules JSON string containing the custom rules to add
     */
    private registerCustomScannerRules;
    /**
     * @description The main workflow for the sfdx scanner pull request action
     */
    workflow(): Promise<void>;
}
