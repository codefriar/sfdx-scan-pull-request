import { BaseReporter, GithubAnnotation } from "./reporter.types";
import { ScannerViolation } from "../sfdxCli.types";
export declare const ERROR = "Error";
export declare const RIGHT = "RIGHT";
export declare class AnnotationsReporter extends BaseReporter<GithubAnnotation> {
    /**
     * @description Executes the REST request to submit the Check Run to GitHub
     * @param body
     * @private
     */
    private performGithubRequest;
    /**
     * @description Writes the Check Run to GitHub
     */
    write(): Promise<void>;
    /**
     * @description Translates a violation object into a comment
     *  with a formatted body
     * @param filePath File path that the violation took place in
     * @param violation sfdx-scanner violation
     * @param engine The engine that discovered the violation
     */
    translateViolationToReport(filePath: string, violation: ScannerViolation, engine: string): void;
}
