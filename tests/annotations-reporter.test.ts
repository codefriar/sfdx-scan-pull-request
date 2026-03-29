jest.mock("../src/reporter/base-reporter", () => {
  class MockBaseReporter {
    hasHaltingError = false;
    issues: any[] = [];
    context: any;
    inputs: any;
    octokit = { request: jest.fn() };
    constructor({ context, inputs }: any) {
      this.context = context;
      this.inputs = inputs;
    }
    async write() {
      throw new Error("Method not implemented.");
    }
    translateViolationToReport() {
      throw new Error("Method not implemented.");
    }
    checkHasHaltingError() {
      if (this.hasHaltingError) {
        require("@actions/core").setFailed("One or more errors...");
      }
    }
  }
  return { BaseReporter: MockBaseReporter };
});

jest.mock("@actions/github", () => ({
  context: {
    repo: { owner: "test-owner", repo: "test-repo" },
    payload: { pull_request: { number: 42, head: { sha: "abc123" } } },
    sha: "abc123",
  },
}));

import { AnnotationsReporter } from "../src/reporter/annotations-reporter.js";
import { PluginInputs } from "../src/common.js";
import { ScannerViolation } from "../src/sfdxCli.types.js";
import { context } from "@actions/github";

describe("AnnotationsReporter", () => {
  let reporter: AnnotationsReporter;
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

  beforeEach(() => {
    reporter = new AnnotationsReporter({
      context: context,
      inputs: baseInputs,
    });
  });

  describe("translateViolationToReport", () => {
    it("should create an annotation with correct fields", () => {
      const violation: ScannerViolation = {
        category: "Security",
        column: "1",
        endColumn: "10",
        endLine: "20",
        line: "10",
        message: "Avoid hardcoding IDs",
        ruleName: "AvoidHardcodingId",
        severity: 3,
        url: "https://example.com/rule",
      };

      reporter.translateViolationToReport("src/MyClass.cls", violation, "pmd");

      expect(reporter.issues).toHaveLength(1);
      const annotation = reporter.issues[0];
      expect(annotation.path).toBe("src/MyClass.cls");
      expect(annotation.start_line).toBe(10);
      expect(annotation.end_line).toBe(20);
      expect(annotation.annotation_level).toBe("notice");
      expect(annotation.message).toContain("Security");
      expect(annotation.message).toContain("Avoid hardcoding IDs");
      expect(annotation.title).toContain("AvoidHardcodingId");
      expect(annotation.title).toContain("3");
    });

    it("should set hasHaltingError when violation severity meets threshold", () => {
      const violation: ScannerViolation = {
        category: "Security",
        column: "1",
        endColumn: "10",
        endLine: "20",
        line: "10",
        message: "Critical issue",
        ruleName: "CriticalRule",
        severity: 1,
        url: "https://example.com/rule",
      };

      reporter.translateViolationToReport("src/MyClass.cls", violation, "pmd");

      expect(reporter.hasHaltingError).toBe(true);
    });

    it("should NOT set hasHaltingError for warnings below threshold", () => {
      const violation: ScannerViolation = {
        category: "BestPractice",
        column: "1",
        endColumn: "10",
        endLine: "20",
        line: "10",
        message: "Minor warning",
        ruleName: "MinorRule",
        severity: 3,
        url: "https://example.com/rule",
      };

      reporter.translateViolationToReport("src/MyClass.cls", violation, "pmd");

      expect(reporter.hasHaltingError).toBe(false);
    });

    it("should increment endLine when it equals startLine", () => {
      const violation: ScannerViolation = {
        category: "Design",
        column: "1",
        endColumn: "10",
        endLine: "5",
        line: "5",
        message: "Single line issue",
        ruleName: "SingleLineRule",
        severity: 3,
        url: "https://example.com/rule",
      };

      reporter.translateViolationToReport("src/MyClass.cls", violation, "pmd");

      expect(reporter.issues[0].start_line).toBe(5);
      expect(reporter.issues[0].end_line).toBe(6);
    });
  });
});
