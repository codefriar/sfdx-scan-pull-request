import { expect, it, describe } from "@jest/globals";
import fs from "fs";
import {
  fileExists,
  getScannerViolationType,
  getGithubFilePath,
  PluginInputs,
} from "../src/common";
import { ScannerViolation } from "../src/sfdxCli.types";

jest.mock("fs");

describe("fileExists", () => {
  it("should return true when file exists", () => {
    (fs.accessSync as jest.Mock).mockReturnValue(undefined);
    expect(fileExists("/some/path")).toBe(true);
  });

  it("should return false when file does not exist", () => {
    (fs.accessSync as jest.Mock).mockImplementation(() => {
      throw new Error("ENOENT");
    });
    expect(fileExists("/some/path")).toBe(false);
  });
});

describe("getScannerViolationType", () => {
  const baseInputs: PluginInputs = {
    severityThreshold: 2,
    strictlyEnforcedRules: "",
    maxNumberOfComments: 100,
    commentBatchSize: 15,
    rateLimitWaitTime: 60000,
    rateLimitRetries: 5,
    deleteResolvedComments: false,
    reportMode: "check-runs",
    target: "",
    runFlowScanner: false,
    debug: false,
    exportSarif: false,
  };

  const makeViolation = (
    overrides: Partial<ScannerViolation> = {}
  ): ScannerViolation => ({
    category: "Best Practices",
    column: "1",
    endColumn: "1",
    endLine: "10",
    line: "5",
    message: "Some violation",
    ruleName: "SomeRule",
    severity: 3,
    url: "https://example.com",
    ...overrides,
  });

  it("should return Error when severity meets threshold", () => {
    const result = getScannerViolationType(
      { ...baseInputs, severityThreshold: 3 },
      makeViolation({ severity: 3 }),
      "pmd"
    );
    expect(result).toBe("Error");
  });

  it("should return Error when severity is below threshold", () => {
    const result = getScannerViolationType(
      { ...baseInputs, severityThreshold: 3 },
      makeViolation({ severity: 1 }),
      "pmd"
    );
    expect(result).toBe("Error");
  });

  it("should return Warning when severity exceeds threshold and no enforced rules", () => {
    const result = getScannerViolationType(
      { ...baseInputs, severityThreshold: 1 },
      makeViolation({ severity: 3 }),
      "pmd"
    );
    expect(result).toBe("Warning");
  });

  it("should return Error when violation matches a strictly enforced rule", () => {
    const enforcedRules = JSON.stringify([
      { engine: "pmd", category: "Best Practices", rule: "SomeRule" },
    ]);
    const result = getScannerViolationType(
      {
        ...baseInputs,
        severityThreshold: 0,
        strictlyEnforcedRules: enforcedRules,
      },
      makeViolation({ category: "Best Practices", ruleName: "SomeRule" }),
      "pmd"
    );
    expect(result).toBe("Error");
  });

  it("should return Warning when violation does not match enforced rules", () => {
    const enforcedRules = JSON.stringify([
      { engine: "pmd", category: "Security", rule: "OtherRule" },
    ]);
    const result = getScannerViolationType(
      {
        ...baseInputs,
        severityThreshold: 0,
        strictlyEnforcedRules: enforcedRules,
      },
      makeViolation({ category: "Best Practices", ruleName: "SomeRule" }),
      "pmd"
    );
    expect(result).toBe("Warning");
  });
});

describe("getGithubFilePath", () => {
  it("should construct a GitHub tree URL path", () => {
    const result = getGithubFilePath("abc123", "src/Foo.cls");
    expect(result).toBe("../tree/abc123/src/Foo.cls");
  });
});
