import { ScannerFlags } from "./sfdxCli.types";
/**
 * @description This class is responsible for interfacing with the Salesforce CLI.
 */
export default class SfCLI {
    private scannerFlags;
    /**
     * @description Constructor for the SfCLI class
     * @param scannerFlags the command line flags to pass to the scanner.
     */
    constructor(scannerFlags: ScannerFlags);
    /**
     * @description Scans the files in the target directory and returns the findings. This is the method where
     * the bulk of the work is done. It's responsible for having the Sarif file created, parsing it and returning
     * the findings in a format that can be easily consumed by the reporter.
     */
    getFindingsForFiles(): Promise<ScannerFinding[]>;
    /**
     * @description Executes a sfdx command on the command line
     * @param commandName this is the 'topic' (namespace) and 'command' (action) to execute. ie: 'scanner run'
     * @param cliArgs an array of strings to pass as arguments to the command
     */
    private cli;
    /**
     * @description uses the sf scanner to generate a .sarif file containing the scan results.
     * Sarif is a bit more verbose than the default json output, but it is more structured and has the side
     * effect of generating the output file in a format that can be easily consumed by the GitHub Security tab.
     */
    private generateSarifOutputFile;
    /**
     * @description Registers a new rule with the scanner
     * @param path The path to the rule's .jar file
     * @param language the language the rule is written for ie: apex, html, etc.
     */
    registerRule(path: string, language: string): Promise<string | ScannerFinding[]>;
}
