import { ScannerViolation, ScannerViolationType } from "./sfdxCli.types";
export type PluginInputs = {
    severityThreshold: number;
    strictlyEnforcedRules: string;
    customPmdRules?: string;
    maxNumberOfComments: number;
    commentBatchSize: number;
    rateLimitWaitTime: number;
    rateLimitRetries: number;
    deleteResolvedComments: boolean;
    reportMode: string | "comments" | "check-runs";
    target: string;
    runFlowScanner: boolean;
    debug: boolean;
    exportSarif: boolean;
};
export declare function fileExists(filePath: string): boolean;
export declare function getScannerViolationType(inputs: PluginInputs, violation: ScannerViolation, engine: string): ScannerViolationType;
export declare function getGithubFilePath(commitId: string, filePath: string): string;
