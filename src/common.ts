import { ScannerViolation, ScannerViolationType } from "./sfdxCli";
import fs from "fs";

export type PluginInputs = {
  severityThreshold: number;
  strictlyEnforcedRules: string;
  customPmdRules?: string;
  maxNumberOfComments: number;
  commentBatchSize: number;
  rateLimitWaitTime: number;
  deleteResolvedComments: boolean;
  reportMode: string | "comments" | "check-runs";
  target: string;
  runFlowScanner: boolean;
  debug: boolean;
  exportSarif: boolean;
};

export function fileExists(filePath: string) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

export function getScannerViolationType(
  inputs: PluginInputs,
  violation: ScannerViolation,
  engine: string
): ScannerViolationType {
  if (inputs.severityThreshold >= violation.severity) {
    return "Error";
  }
  if (!inputs.strictlyEnforcedRules) {
    return "Warning";
  }
  let violationDetail = {
    engine: engine,
    category: violation.category,
    rule: violation.ruleName,
  };
  for (let enforcedRule of JSON.parse(inputs.strictlyEnforcedRules) as {
    [key in string]: string;
  }[]) {
    if (
      Object.entries(violationDetail).toString() ===
      Object.entries(enforcedRule).toString()
    ) {
      return "Error";
    }
  }
  return "Warning";
}

export function getGithubFilePath(commitId: string, filePath: string) {
  return ["..", "tree", commitId, filePath].join("/");
}
