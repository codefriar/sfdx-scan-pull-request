import fs from "fs";
import { ScannerViolation, ScannerViolationType } from "./sfdxCli.types.js";

export type PluginInputs = {
  severityThreshold: number;
  strictlyEnforcedRules: string;
  customPmdRules?: string;
  maxNumberOfComments: number;
  commentBatchSize: number;
  rateLimitWaitTime: number;
  rateLimitRetries: number;
  deleteResolvedComments: boolean;
  reportMode: "comments" | "check-runs";
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
  for (const enforcedRule of JSON.parse(inputs.strictlyEnforcedRules) as {
    engine: string;
    category: string;
    rule: string;
  }[]) {
    if (
      enforcedRule.engine === engine &&
      enforcedRule.category === violation.category &&
      enforcedRule.rule === violation.ruleName
    ) {
      return "Error";
    }
  }
  return "Warning";
}

export function getGithubFilePath(commitId: string, filePath: string) {
  return ["..", "tree", commitId, filePath].join("/");
}
