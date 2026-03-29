import { expect, it, describe, beforeEach } from "@jest/globals";
import { PluginInputs } from "../src/common";
import { ScannerViolation } from "../src/sfdxCli.types";

jest.mock("@actions/core", () => ({
  setFailed: jest.fn(),
}));

jest.mock("@actions/github", () => ({
  context: {
    repo: { owner: "test-owner", repo: "test-repo" },
    payload: { pull_request: { number: 42, head: { sha: "abc123" } } },
    sha: "abc123",
  },
}));

jest.mock("../src/reporter/base-reporter", () => {
  class MockBaseReporter {
    protected hasHaltingError = false;
    protected inputs: any;
    protected issues: any[] = [];
    protected context: any;
    protected octokit = {
      request: jest.fn(),
      paginate: jest.fn(),
      graphql: jest.fn(),
    };

    constructor({ context, inputs }: any) {
      this.context = context;
      this.inputs = inputs;
    }

    checkHasHaltingError() {
      // no-op for tests
    }
  }
  return { BaseReporter: MockBaseReporter };
});

import { CommentsReporter } from "../src/reporter/comments-reporter";
import { context } from "@actions/github";

const defaultInputs: PluginInputs = {
  severityThreshold: 3,
  strictlyEnforcedRules: "",
  maxNumberOfComments: 10,
  commentBatchSize: 5,
  rateLimitWaitTime: 1000,
  rateLimitRetries: 3,
  deleteResolvedComments: false,
  reportMode: "comments",
  target: "force-app",
  runFlowScanner: false,
  debug: false,
  exportSarif: false,
};

function createReporter(inputOverrides?: Partial<PluginInputs>) {
  const inputs = { ...defaultInputs, ...inputOverrides };
  return new CommentsReporter({ context, inputs });
}

function createViolation(
  overrides?: Partial<ScannerViolation>
): ScannerViolation {
  return {
    category: "Best Practices",
    column: "1",
    endColumn: "10",
    endLine: "15",
    line: "10",
    message: "Avoid something bad",
    ruleName: "AvoidSomething",
    severity: 2,
    url: "https://example.com/rule",
    ...overrides,
  };
}

describe("CommentsReporter", () => {
  describe("matchComment", () => {
    let reporter: CommentsReporter;

    beforeEach(() => {
      reporter = createReporter();
    });

    it("should match comments with same line, path, and body (ignoring last pipe section)", () => {
      const commentA = {
        commit_id: "commit-a",
        path: "src/MyClass.cls",
        start_line: 10,
        start_side: "RIGHT" as const,
        side: "RIGHT" as const,
        line: 15,
        body: "<!--sfdx-scanner-->|Engine|pmd|Category|Best Practices|File|[link-a](commit-a)|",
      };
      const commentB = {
        commit_id: "commit-b",
        path: "src/MyClass.cls",
        start_line: 10,
        start_side: "RIGHT" as const,
        side: "RIGHT" as const,
        line: 15,
        body: "<!--sfdx-scanner-->|Engine|pmd|Category|Best Practices|File|[link-b](commit-b)|",
      };

      expect(reporter.matchComment(commentA, commentB)).toBe(true);
    });

    it("should not match comments with different lines", () => {
      const commentA = {
        commit_id: "commit-a",
        path: "src/MyClass.cls",
        start_line: 10,
        start_side: "RIGHT" as const,
        side: "RIGHT" as const,
        line: 15,
        body: "<!--sfdx-scanner-->|Engine|pmd|",
      };
      const commentB = {
        commit_id: "commit-a",
        path: "src/MyClass.cls",
        start_line: 10,
        start_side: "RIGHT" as const,
        side: "RIGHT" as const,
        line: 20,
        body: "<!--sfdx-scanner-->|Engine|pmd|",
      };

      expect(reporter.matchComment(commentA, commentB)).toBe(false);
    });

    it("should not match comments with different paths", () => {
      const commentA = {
        commit_id: "commit-a",
        path: "src/ClassA.cls",
        start_line: 10,
        start_side: "RIGHT" as const,
        side: "RIGHT" as const,
        line: 15,
        body: "<!--sfdx-scanner-->|Engine|pmd|",
      };
      const commentB = {
        commit_id: "commit-a",
        path: "src/ClassB.cls",
        start_line: 10,
        start_side: "RIGHT" as const,
        side: "RIGHT" as const,
        line: 15,
        body: "<!--sfdx-scanner-->|Engine|pmd|",
      };

      expect(reporter.matchComment(commentA, commentB)).toBe(false);
    });

    it("should not match comments with different body content (excluding last section)", () => {
      const commentA = {
        commit_id: "commit-a",
        path: "src/MyClass.cls",
        start_line: 10,
        start_side: "RIGHT" as const,
        side: "RIGHT" as const,
        line: 15,
        body: "<!--sfdx-scanner-->|Engine|pmd|Category|Best Practices|File|link|",
      };
      const commentB = {
        commit_id: "commit-a",
        path: "src/MyClass.cls",
        start_line: 10,
        start_side: "RIGHT" as const,
        side: "RIGHT" as const,
        line: 15,
        body: "<!--sfdx-scanner-->|Engine|eslint|Category|Design|File|link|",
      };

      expect(reporter.matchComment(commentA, commentB)).toBe(false);
    });
  });

  describe("translateViolationToReport", () => {
    let reporter: CommentsReporter;

    beforeEach(() => {
      reporter = createReporter();
    });

    it("should push a comment with correct path, start_line, line, and body", () => {
      const violation = createViolation({ line: "10", endLine: "15" });
      reporter.translateViolationToReport("src/MyClass.cls", violation, "pmd");

      const issues = (reporter as any).issues;
      expect(issues).toHaveLength(1);
      expect(issues[0].path).toBe("src/MyClass.cls");
      expect(issues[0].start_line).toBe(10);
      expect(issues[0].line).toBe(15);
      expect(issues[0].body).toContain("<!--sfdx-scanner-->");
      expect(issues[0].commit_id).toBe("abc123");
    });

    it("should increment endLine when startLine equals endLine", () => {
      const violation = createViolation({ line: "10", endLine: "10" });
      reporter.translateViolationToReport("src/MyClass.cls", violation, "pmd");

      const issues = (reporter as any).issues;
      expect(issues[0].start_line).toBe(10);
      expect(issues[0].line).toBe(11);
    });

    it("should use line as endLine when endLine is empty", () => {
      const violation = createViolation({ line: "10", endLine: "" });
      reporter.translateViolationToReport("src/MyClass.cls", violation, "pmd");

      const issues = (reporter as any).issues;
      expect(issues[0].start_line).toBe(10);
      // endLine falls back to line (10), then since start === end, it increments to 11
      expect(issues[0].line).toBe(11);
    });

    it("should set side and start_side to RIGHT", () => {
      const violation = createViolation();
      reporter.translateViolationToReport("src/MyClass.cls", violation, "pmd");

      const issues = (reporter as any).issues;
      expect(issues[0].side).toBe("RIGHT");
      expect(issues[0].start_side).toBe("RIGHT");
    });
  });

  describe("getFormattedBody", () => {
    let reporter: CommentsReporter;

    beforeEach(() => {
      reporter = createReporter();
    });

    it("should include the hidden comment prefix", () => {
      const violation = createViolation();
      const body = reporter.getFormattedBody(
        "pmd",
        "Error",
        violation,
        "src/MyClass.cls",
        "abc123"
      );

      expect(body).toContain("<!--sfdx-scanner-->");
    });

    it("should include all expected table fields", () => {
      const violation = createViolation({
        category: "Best Practices",
        ruleName: "AvoidSomething",
        severity: 2,
        message: "Avoid something bad",
        url: "https://example.com/rule",
      });

      const body = reporter.getFormattedBody(
        "pmd",
        "Error",
        violation,
        "src/MyClass.cls",
        "abc123"
      );

      expect(body).toContain("| Engine | pmd|");
      expect(body).toContain("| Category | Best Practices |");
      expect(body).toContain("| Rule | AvoidSomething |");
      expect(body).toContain("| Severity | 2 |");
      expect(body).toContain("| Type | Error |");
      expect(body).toContain("| Message|");
      expect(body).toContain("[Avoid something bad](https://example.com/rule)");
      expect(body).toContain("| File |");
      expect(body).toContain("[src/MyClass.cls]");
    });

    it("should contain a markdown table header", () => {
      const violation = createViolation();
      const body = reporter.getFormattedBody(
        "pmd",
        "Warning",
        violation,
        "src/MyClass.cls",
        "abc123"
      );

      expect(body).toContain("| Attribute | Value |");
      expect(body).toContain("| --- | --- |");
    });

    it("should include the file link with commit path", () => {
      const violation = createViolation();
      const body = reporter.getFormattedBody(
        "pmd",
        "Error",
        violation,
        "src/MyClass.cls",
        "commit-sha-456"
      );

      expect(body).toContain(
        "[src/MyClass.cls](../tree/commit-sha-456/src/MyClass.cls)"
      );
    });
  });
});
