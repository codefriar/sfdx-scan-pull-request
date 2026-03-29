import * as path from "path";
import { ScannerFinding, ScannerViolation } from "./sfdxCli.types.js";
import { SarifDocument } from "./sarif.types.js";

/**
 * @description Parses a SARIF document into an array of ScannerFindings.
 * Pure function with no side effects.
 * @param sarifJson The parsed SARIF document
 * @returns Array of scanner findings grouped by engine and file
 */
export function parseSarifToFindings(
  sarifJson: SarifDocument
): ScannerFinding[] {
  const findings: ScannerFinding[] = [];

  for (const run of sarifJson.runs) {
    const rules = new Map(run.tool.driver.rules.map((rule) => [rule.id, rule]));
    const engine = run.tool.driver.name;
    const fileViolations = new Map<string, ScannerViolation[]>();

    for (const result of run.results) {
      const rule = rules.get(result.ruleId);
      const location = result.locations[0].physicalLocation;
      const fileName = path.normalize(location.artifactLocation.uri);

      const violation: ScannerViolation = {
        category: rule?.properties.category || "",
        column: location.region.startColumn.toString(),
        endColumn: location.region.endColumn?.toString() || "",
        endLine: location.region.endLine?.toString() || "",
        line: location.region.startLine.toString(),
        message: result.message.text,
        ruleName: result.ruleId,
        severity: rule?.properties.severity || 0,
        url: rule?.helpUri,
      };

      const existing = fileViolations.get(fileName);
      if (existing) {
        existing.push(violation);
      } else {
        fileViolations.set(fileName, [violation]);
      }
    }

    for (const [fileName, violations] of fileViolations) {
      findings.push({ fileName, engine, violations });
    }
  }

  return findings;
}
