import { expect, it, describe } from "@jest/globals";
import fs from "fs";
import path from "path";
import { parseSarifToFindings } from "../src/sarif-parser";
import { SarifDocument } from "../src/sarif.types";

const fixturePath = path.join(__dirname, "fixtures", "example-sarif.json");
const sarifJson: SarifDocument = JSON.parse(
  fs.readFileSync(fixturePath, "utf-8")
);

describe("parseSarifToFindings", () => {
  it("should return one finding per engine+file combination", () => {
    const findings = parseSarifToFindings(sarifJson);
    expect(findings).toHaveLength(3);
  });

  it("should group violations by file within each run", () => {
    const sameFileSarif: SarifDocument = {
      version: "2.1.0",
      runs: [{
        tool: { driver: { name: "pmd", rules: [
          { id: "Rule1", shortDescription: { text: "Rule 1" }, properties: { category: "Cat", severity: 1 } },
          { id: "Rule2", shortDescription: { text: "Rule 2" }, properties: { category: "Cat", severity: 2 } },
        ]}},
        results: [
          { ruleId: "Rule1", message: { text: "msg1" }, locations: [{ physicalLocation: { artifactLocation: { uri: "src/Foo.cls" }, region: { startLine: 1, startColumn: 1 } } }] },
          { ruleId: "Rule2", message: { text: "msg2" }, locations: [{ physicalLocation: { artifactLocation: { uri: "src/Foo.cls" }, region: { startLine: 5, startColumn: 1 } } }] },
        ],
      }],
    };
    const findings = parseSarifToFindings(sameFileSarif);
    expect(findings).toHaveLength(1);
    expect(findings[0].violations).toHaveLength(2);
    expect(findings[0].engine).toBe("pmd");
  });

  it("should correctly map violation fields from SARIF result", () => {
    const findings = parseSarifToFindings(sarifJson);
    const pmdFinding = findings.find(f => f.engine === "pmd" && f.fileName.includes("MyTest"));
    expect(pmdFinding).toBeDefined();
    const v = pmdFinding!.violations[0];
    expect(v.ruleName).toBe("ApexUnitTestClassShouldHaveAsserts");
    expect(v.message).toBe("Test class should have asserts");
    expect(v.line).toBe("5");
    expect(v.endLine).toBe("10");
    expect(v.column).toBe("1");
    expect(v.endColumn).toBe("2");
    expect(v.severity).toBe(2);
    expect(v.category).toBe("Best Practices");
  });

  it("should handle missing optional fields with empty string defaults", () => {
    const findings = parseSarifToFindings(sarifJson);
    const finding = findings.find(f => f.engine === "pmd" && f.fileName.includes("MyClass"));
    expect(finding).toBeDefined();
    const v = finding!.violations[0];
    expect(v.endLine).toBe("");
    expect(v.endColumn).toBe("");
  });

  it("should return empty array for SARIF with no results", () => {
    const emptySarif: SarifDocument = { version: "2.1.0", runs: [{ tool: { driver: { name: "pmd", rules: [] } }, results: [] }] };
    expect(parseSarifToFindings(emptySarif)).toEqual([]);
  });

  it("should normalize file paths", () => {
    const findings = parseSarifToFindings(sarifJson);
    for (const finding of findings) {
      expect(finding.fileName).not.toContain("\\");
    }
  });
});
