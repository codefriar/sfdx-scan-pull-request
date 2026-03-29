# Code Review Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix broken test infrastructure, raise code coverage from ~0% to >80%, fix all bugs identified in code review, and improve architecture for testability.

**Architecture:** The core change is making all classes accept dependencies via constructor injection instead of importing singletons directly. We extract a pure `parseSarifToFindings()` function from `SfCLI` so SARIF parsing can be tested without mocking `execSync`. Reporters get their interface fixed to be properly async. All shell command construction is sanitized.

**Tech Stack:** TypeScript, Jest with @swc/jest, @actions/core, @octokit/*, parse-diff

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `jest.config.json` | Modify | Fix module resolution for `.js` imports |
| `.gitignore` | Modify | Exclude compiled test artifacts |
| `tests/git-actions.test.js` | Delete | Compiled artifact, should not be in repo |
| `tests/git-actions.test.js.map` | Delete | Compiled artifact |
| `tests/sfdx-cli.test.js` | Delete | Compiled artifact |
| `tests/sfdx-cli.test.js.map` | Delete | Compiled artifact |
| `tests/fixtures/example-sarif.json` | Create | SARIF fixture for testing parser |
| `src/sarif-parser.ts` | Create | Pure function: SARIF JSON -> ScannerFinding[] |
| `tests/sarif-parser.test.ts` | Create | Tests for SARIF parsing logic |
| `src/sfdxCli.ts` | Modify | Use sarif-parser, remove pointless try/catch |
| `tests/sfdx-cli.test.ts` | Modify | Fix imports, test with real SARIF fixture |
| `src/common.ts` | Modify | Fix reportMode type, fix strictlyEnforcedRules matching |
| `tests/common.test.ts` | Create | Tests for fileExists, getScannerViolationType, getGithubFilePath |
| `src/reporter/reporter.types.ts` | Modify | Make Reporter.write() return Promise<void> |
| `src/reporter/base-reporter.ts` | Modify | Fix write() signature, accept octokit via constructor |
| `src/reporter/annotations-reporter.ts` | Create (rename) | Fix typo, use inherited octokit |
| `src/reporter/annoations-reporter.ts` | Delete | Replaced by correctly-named file |
| `tests/annotations-reporter.test.ts` | Create | Tests for annotation translation and write |
| `src/reporter/comments-reporter.ts` | Modify | Fix duplicate GraphQL call, remove @ts-ignore |
| `tests/comments-reporter.test.ts` | Create | Tests for comment matching, filtering, formatting |
| `src/git-actions.ts` | Modify | Sanitize shell inputs |
| `tests/git-actions.test.ts` | Modify | Fix function signature, unskip with mocks |
| `src/SarifUploader.ts` | Modify | Fix typo, use Node.js base64 instead of shell |
| `tests/sarif-uploader.test.ts` | Create | Tests for SARIF upload logic |
| `src/SfScannerPullRequest.ts` | Modify | Fix String type, constructor injection for testability |
| `tests/sf-scanner-pull-request.test.ts` | Create | Tests for workflow orchestration |

---

### Task 1: Fix Jest Module Resolution and Clean Up Compiled Artifacts

**Files:**
- Modify: `jest.config.json`
- Modify: `.gitignore`
- Delete: `tests/git-actions.test.js`, `tests/git-actions.test.js.map`, `tests/sfdx-cli.test.js`, `tests/sfdx-cli.test.js.map`

- [ ] **Step 1: Update jest.config.json to resolve .js imports to .ts files**

The project uses `"module": "NodeNext"` which requires `.js` extensions in imports even for TypeScript files. Jest needs a `moduleNameMapper` to strip those extensions at test time.

```json
{
  "roots": ["<rootDir>/tests", "<rootDir>/src"],
  "clearMocks": true,
  "moduleFileExtensions": ["js", "ts"],
  "moduleNameMapper": {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
  "testMatch": [
    "**/tests/**/*.(spec|test).[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ],
  "transform": {
    "^.+\\.(t|j)sx?$": "@swc/jest"
  }
}
```

Note: The old `@oclif/core` moduleNameMapper entry is removed since that package is not a direct dependency and the override in package.json handles it.

- [ ] **Step 2: Add test artifacts to .gitignore**

Append to `.gitignore`:

```
# Compiled test artifacts
tests/*.js
tests/*.js.map
```

- [ ] **Step 3: Delete compiled test artifacts**

```bash
git rm tests/git-actions.test.js tests/git-actions.test.js.map tests/sfdx-cli.test.js tests/sfdx-cli.test.js.map
```

- [ ] **Step 4: Run existing tests to verify the fix**

```bash
npx jest tests/engine-selection.test.ts --verbose
```

Expected: All 14 tests pass (4 skipped). No "Cannot find module" errors.

```bash
npx jest tests/sfdx-cli.test.ts --verbose
```

Expected: The "Cannot find module './common.js'" error is gone. Tests may still fail for other reasons (we fix those in Task 4), but the module resolution error must be gone.

- [ ] **Step 5: Commit**

```bash
git add jest.config.json .gitignore
git commit -m "fix: jest module resolution for NodeNext .js imports and clean up compiled test artifacts"
```

---

### Task 2: Extract SARIF Parser as a Pure Function

**Files:**
- Create: `src/sarif-parser.ts`
- Create: `tests/fixtures/example-sarif.json`
- Create: `tests/sarif-parser.test.ts`

- [ ] **Step 1: Create the SARIF test fixture**

Create `tests/fixtures/example-sarif.json`:

```json
{
  "version": "2.1.0",
  "runs": [
    {
      "tool": {
        "driver": {
          "name": "pmd",
          "rules": [
            {
              "id": "ApexUnitTestClassShouldHaveAsserts",
              "shortDescription": { "text": "Test classes should have asserts" },
              "helpUri": "https://pmd.github.io/pmd/pmd_rules_apex_bestpractices.html#apexunittestclassshouldhaveasserts",
              "properties": { "category": "Best Practices", "severity": 2 }
            },
            {
              "id": "AvoidGlobalModifier",
              "shortDescription": { "text": "Avoid global modifier" },
              "helpUri": "https://pmd.github.io/pmd/pmd_rules_apex_bestpractices.html#avoidglobalmodifier",
              "properties": { "category": "Best Practices", "severity": 3 }
            }
          ]
        }
      },
      "results": [
        {
          "ruleId": "ApexUnitTestClassShouldHaveAsserts",
          "message": { "text": "Test class should have asserts" },
          "locations": [
            {
              "physicalLocation": {
                "artifactLocation": { "uri": "force-app/main/default/classes/MyTest.cls" },
                "region": { "startLine": 5, "startColumn": 1, "endLine": 10, "endColumn": 2 }
              }
            }
          ]
        },
        {
          "ruleId": "AvoidGlobalModifier",
          "message": { "text": "Avoid using global modifier" },
          "locations": [
            {
              "physicalLocation": {
                "artifactLocation": { "uri": "force-app/main/default/classes/MyClass.cls" },
                "region": { "startLine": 1, "startColumn": 1 }
              }
            }
          ]
        }
      ]
    },
    {
      "tool": {
        "driver": {
          "name": "eslint",
          "rules": [
            {
              "id": "no-unused-vars",
              "shortDescription": { "text": "Disallow unused variables" },
              "helpUri": "https://eslint.org/docs/rules/no-unused-vars",
              "properties": { "category": "Variables", "severity": 1 }
            }
          ]
        }
      },
      "results": [
        {
          "ruleId": "no-unused-vars",
          "message": { "text": "'x' is defined but never used" },
          "locations": [
            {
              "physicalLocation": {
                "artifactLocation": { "uri": "force-app/main/default/lwc/myComp/myComp.js" },
                "region": { "startLine": 3, "startColumn": 7, "endLine": 3, "endColumn": 8 }
              }
            }
          ]
        }
      ]
    }
  ]
}
```

- [ ] **Step 2: Write failing tests for the parser**

Create `tests/sarif-parser.test.ts`:

```typescript
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
    // pmd has 2 results in 2 different files = 2 findings
    // eslint has 1 result in 1 file = 1 finding
    expect(findings).toHaveLength(3);
  });

  it("should group violations by file within each run", () => {
    const sameFileSarif: SarifDocument = {
      version: "2.1.0",
      runs: [
        {
          tool: {
            driver: {
              name: "pmd",
              rules: [
                {
                  id: "Rule1",
                  shortDescription: { text: "Rule 1" },
                  properties: { category: "Cat", severity: 1 },
                },
                {
                  id: "Rule2",
                  shortDescription: { text: "Rule 2" },
                  properties: { category: "Cat", severity: 2 },
                },
              ],
            },
          },
          results: [
            {
              ruleId: "Rule1",
              message: { text: "msg1" },
              locations: [
                {
                  physicalLocation: {
                    artifactLocation: { uri: "src/Foo.cls" },
                    region: { startLine: 1, startColumn: 1 },
                  },
                },
              ],
            },
            {
              ruleId: "Rule2",
              message: { text: "msg2" },
              locations: [
                {
                  physicalLocation: {
                    artifactLocation: { uri: "src/Foo.cls" },
                    region: { startLine: 5, startColumn: 1 },
                  },
                },
              ],
            },
          ],
        },
      ],
    };

    const findings = parseSarifToFindings(sameFileSarif);
    expect(findings).toHaveLength(1);
    expect(findings[0].violations).toHaveLength(2);
    expect(findings[0].engine).toBe("pmd");
  });

  it("should correctly map violation fields from SARIF result", () => {
    const findings = parseSarifToFindings(sarifJson);
    const pmdFinding = findings.find(
      (f) => f.engine === "pmd" && f.fileName.includes("MyTest")
    );

    expect(pmdFinding).toBeDefined();
    const violation = pmdFinding!.violations[0];
    expect(violation.ruleName).toBe("ApexUnitTestClassShouldHaveAsserts");
    expect(violation.message).toBe("Test class should have asserts");
    expect(violation.line).toBe("5");
    expect(violation.endLine).toBe("10");
    expect(violation.column).toBe("1");
    expect(violation.endColumn).toBe("2");
    expect(violation.severity).toBe(2);
    expect(violation.category).toBe("Best Practices");
    expect(violation.url).toBe(
      "https://pmd.github.io/pmd/pmd_rules_apex_bestpractices.html#apexunittestclassshouldhaveasserts"
    );
  });

  it("should handle missing optional fields with empty string defaults", () => {
    const findings = parseSarifToFindings(sarifJson);
    const globalModFinding = findings.find(
      (f) => f.engine === "pmd" && f.fileName.includes("MyClass")
    );

    expect(globalModFinding).toBeDefined();
    const violation = globalModFinding!.violations[0];
    expect(violation.endLine).toBe("");
    expect(violation.endColumn).toBe("");
  });

  it("should return empty array for SARIF with no results", () => {
    const emptySarif: SarifDocument = {
      version: "2.1.0",
      runs: [
        {
          tool: { driver: { name: "pmd", rules: [] } },
          results: [],
        },
      ],
    };

    const findings = parseSarifToFindings(emptySarif);
    expect(findings).toEqual([]);
  });

  it("should normalize file paths", () => {
    const findings = parseSarifToFindings(sarifJson);
    for (const finding of findings) {
      expect(finding.fileName).not.toContain("\\");
    }
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

```bash
npx jest tests/sarif-parser.test.ts --verbose
```

Expected: FAIL with "Cannot find module '../src/sarif-parser'"

- [ ] **Step 4: Implement the parser**

Create `src/sarif-parser.ts`:

```typescript
import * as path from "path";
import { ScannerFinding, ScannerViolation } from "./sfdxCli.types.js";
import { SarifDocument } from "./sarif.types.js";

/**
 * @description Parses a SARIF document into an array of ScannerFindings.
 * This is a pure function with no side effects - it takes structured SARIF
 * data and returns structured findings.
 * @param sarifJson The parsed SARIF document
 * @returns Array of scanner findings grouped by engine and file
 */
export function parseSarifToFindings(
  sarifJson: SarifDocument
): ScannerFinding[] {
  const findings: ScannerFinding[] = [];

  for (const run of sarifJson.runs) {
    const rules = new Map(
      run.tool.driver.rules.map((rule) => [rule.id, rule])
    );
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
```

- [ ] **Step 5: Run the tests to verify they pass**

```bash
npx jest tests/sarif-parser.test.ts --verbose
```

Expected: All 6 tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/sarif-parser.ts tests/sarif-parser.test.ts tests/fixtures/example-sarif.json
git commit -m "refactor: extract SARIF parser into pure testable function"
```

---

### Task 3: Wire SfCLI to Use Extracted Parser and Remove Dead Code

**Files:**
- Modify: `src/sfdxCli.ts`
- Modify: `tests/sfdx-cli.test.ts`

- [ ] **Step 1: Update sfdxCli.ts to use the extracted parser and remove pointless try/catch**

Replace the full contents of `src/sfdxCli.ts`:

```typescript
import { execSync } from "child_process";
import fs from "fs";
import { fileExists } from "./common.js";
import { ScannerFinding, ScannerFlags, SfdxCommandResult } from "./sfdxCli.types.js";
import { SarifDocument } from "./sarif.types.js";
import { parseSarifToFindings } from "./sarif-parser.js";

/**
 * @description This class is responsible for interfacing with the Salesforce CLI.
 */
export default class SfCLI {
  private scannerFlags: ScannerFlags;

  /**
   * @description Constructor for the SfCLI class
   * @param scannerFlags the command line flags to pass to the scanner.
   */
  constructor(scannerFlags: ScannerFlags) {
    this.scannerFlags = scannerFlags;
  }

  /**
   * @description Scans the files in the target directory and returns the findings.
   * Generates a SARIF file via the CLI, then parses it into ScannerFinding objects.
   */
  async getFindingsForFiles(): Promise<ScannerFinding[]> {
    await this.generateSarifOutputFile();
    if (!fileExists(this.scannerFlags.outfile)) {
      throw new Error("SARIF output file not found");
    }
    const sarifContent = fs.readFileSync(this.scannerFlags.outfile, "utf-8");
    const sarifJson: SarifDocument = JSON.parse(sarifContent) as SarifDocument;
    return parseSarifToFindings(sarifJson);
  }

  /**
   * @description Executes a sfdx command on the command line
   * @param commandName this is the 'topic' (namespace) and 'command' (action) to execute
   * @param cliArgs an array of strings to pass as arguments to the command
   */
  private async cli<T>(commandName: string, cliArgs: string[] = []) {
    const cliCommand = `sf ${commandName} ${cliArgs.join(" ")}`;
    const jsonPayload = execSync(cliCommand, {
      maxBuffer: 10485760,
    }).toString();
    return (JSON.parse(jsonPayload) as SfdxCommandResult<T>).result;
  }

  /**
   * @description Uses the sf scanner to generate a .sarif file containing the scan results.
   */
  private async generateSarifOutputFile() {
    this.scannerFlags.target = `"` + this.scannerFlags.target + `"`;
    const scannerCliArgs = (
      Object.keys(this.scannerFlags) as Array<keyof ScannerFlags>
    )
      .map<string[]>((key) =>
        this.scannerFlags[key]
          ? ([`--${key}`, this.scannerFlags[key]] as string[])
          : []
      )
      .reduce((acc, [one, two]) => (one && two ? [...acc, one, two] : acc), []);
    console.log("Executing Sf scanner on the command line");
    return await this.cli("scanner run", [...scannerCliArgs, "--json"]);
  }

  /**
   * @description Registers a new rule with the scanner
   * @param path The path to the rule's .jar file
   * @param language the language the rule is written for
   */
  async registerRule(path: string, language: string) {
    return this.cli<ScannerFinding[] | string>("scanner rule add", [
      `--path="${path}"`,
      `--language="${language}"`,
      "--json",
    ]);
  }
}
```

Key changes:
- Imports and uses `parseSarifToFindings` instead of inline parsing
- Removed pointless `try { ... } catch (err) { throw err; }` from `cli()` and `generateSarifOutputFile()`
- Removed unused `import * as path` since that's now in the parser

- [ ] **Step 2: Update sfdx-cli.test.ts to work with new structure**

Replace `tests/sfdx-cli.test.ts`:

```typescript
import { expect, it, describe, beforeEach } from "@jest/globals";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import SfCLI from "../src/sfdxCli";
import { ScannerFlags } from "../src/sfdxCli.types";

jest.mock("child_process");
jest.mock("fs");

const fixturePath = path.join(__dirname, "fixtures", "example-sarif.json");
const realFs = jest.requireActual("fs") as typeof fs;
const sarifFixture = realFs.readFileSync(fixturePath, "utf-8");

describe("SfCLI", () => {
  let sfCLI: SfCLI;
  let scannerFlags: ScannerFlags;

  beforeEach(() => {
    scannerFlags = {
      engine: "pmd",
      pmdconfig: undefined,
      target: "tests/ExampleClass.cls",
      format: "sarif",
      outfile: "sfdx-scan.sarif",
    };
    sfCLI = new SfCLI(scannerFlags);
    jest.resetAllMocks();
  });

  describe("getFindingsForFiles", () => {
    it("should parse SARIF file and return findings", async () => {
      (execSync as jest.Mock).mockReturnValue(
        JSON.stringify({ result: null })
      );
      (fs.accessSync as jest.Mock).mockReturnValue(undefined);
      (fs.readFileSync as jest.Mock).mockReturnValue(sarifFixture);

      const result = await sfCLI.getFindingsForFiles();

      expect(result).toHaveLength(3);
      expect(result[0].engine).toBe("pmd");
      expect(result[0].violations.length).toBeGreaterThan(0);
    });

    it("should throw when SARIF output file not found", async () => {
      (execSync as jest.Mock).mockReturnValue(
        JSON.stringify({ result: null })
      );
      (fs.accessSync as jest.Mock).mockImplementation(() => {
        throw new Error("ENOENT");
      });

      await expect(sfCLI.getFindingsForFiles()).rejects.toThrow(
        "SARIF output file not found"
      );
    });

    it("should throw when CLI execution fails", async () => {
      const error = new Error("Scanner crashed");
      (execSync as jest.Mock).mockImplementation(() => {
        throw error;
      });

      await expect(sfCLI.getFindingsForFiles()).rejects.toThrow(error);
    });
  });

  describe("registerRule", () => {
    it("should call sf scanner rule add with correct args", async () => {
      (execSync as jest.Mock).mockReturnValue(
        JSON.stringify({ result: "Rule added" })
      );

      const result = await sfCLI.registerRule("/path/to/rule.jar", "apex");

      expect(execSync).toHaveBeenCalledWith(
        expect.stringContaining('scanner rule add --path="/path/to/rule.jar" --language="apex" --json'),
        expect.anything()
      );
      expect(result).toBe("Rule added");
    });

    it("should throw when registering rule fails", async () => {
      const error = new Error("Rule registration failed");
      (execSync as jest.Mock).mockImplementation(() => {
        throw error;
      });

      await expect(sfCLI.registerRule("path", "language")).rejects.toThrow(
        error
      );
    });
  });
});
```

- [ ] **Step 3: Run tests to verify they pass**

```bash
npx jest tests/sfdx-cli.test.ts --verbose
```

Expected: All 5 tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/sfdxCli.ts tests/sfdx-cli.test.ts
git commit -m "refactor: wire SfCLI to extracted SARIF parser, remove pointless try/catch"
```

---

### Task 4: Add Tests for common.ts and Fix Type/Logic Issues

**Files:**
- Modify: `src/common.ts`
- Create: `tests/common.test.ts`

- [ ] **Step 1: Write tests for common.ts**

Create `tests/common.test.ts`:

```typescript
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
      { ...baseInputs, severityThreshold: 0, strictlyEnforcedRules: enforcedRules },
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
      { ...baseInputs, severityThreshold: 0, strictlyEnforcedRules: enforcedRules },
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
```

- [ ] **Step 2: Run the tests to check current behavior**

```bash
npx jest tests/common.test.ts --verbose
```

Expected: Tests should pass against current implementation since we wrote them to match current semantics. If the enforced rule test fails, that confirms the brittle matching bug.

- [ ] **Step 3: Fix common.ts type and matching issues**

Update `src/common.ts`:

```typescript
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
```

Key changes:
- `reportMode` type changed from `string | "comments" | "check-runs"` to `"comments" | "check-runs"`
- `strictlyEnforcedRules` matching now uses explicit field comparisons instead of brittle `Object.entries().toString()`

- [ ] **Step 4: Run the tests to verify they pass**

```bash
npx jest tests/common.test.ts --verbose
```

Expected: All 7 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/common.ts tests/common.test.ts
git commit -m "fix: reportMode type, strictly enforced rules matching, add common.ts tests"
```

---

### Task 5: Fix Reporter Interface and Base Class

**Files:**
- Modify: `src/reporter/reporter.types.ts`
- Modify: `src/reporter/base-reporter.ts`

- [ ] **Step 1: Update Reporter interface to be async**

In `src/reporter/reporter.types.ts`, change the `Reporter` interface:

```typescript
export interface Reporter {
  write(): Promise<void>;
  translateViolationToReport(
    filePath: string,
    violation: ScannerViolation,
    engine: string
  ): void;
}
```

- [ ] **Step 2: Update BaseReporter.write() to be async**

In `src/reporter/base-reporter.ts`, change the `write()` method:

```typescript
  async write(): Promise<void> {
    throw new Error("Method not implemented.");
  }
```

- [ ] **Step 3: Run existing tests to verify nothing breaks**

```bash
npx jest --verbose
```

Expected: All previously passing tests still pass.

- [ ] **Step 4: Commit**

```bash
git add src/reporter/reporter.types.ts src/reporter/base-reporter.ts
git commit -m "fix: make Reporter.write() properly async"
```

---

### Task 6: Rename annotations-reporter.ts (Fix Typo) and Fix Octokit Bug

**Files:**
- Create: `src/reporter/annotations-reporter.ts` (correctly named)
- Delete: `src/reporter/annoations-reporter.ts` (typo)
- Modify: `src/SfScannerPullRequest.ts` (update import)

- [ ] **Step 1: Create correctly-named file with the Octokit fix**

Create `src/reporter/annotations-reporter.ts` (note: this replaces `annoations-reporter.ts`):

```typescript
import { getScannerViolationType } from "../common.js";
import { context } from "@actions/github";
import { GithubAnnotation, GithubCheckRun } from "./reporter.types.js";
import { ScannerViolation } from "../sfdxCli.types.js";
import { BaseReporter } from "./base-reporter.js";

export const ERROR = "Error";
export const RIGHT = "RIGHT";

export class AnnotationsReporter extends BaseReporter<GithubAnnotation> {
  /**
   * @description Executes the REST request to submit the Check Run to GitHub
   * @param body
   * @private
   */
  private performGithubRequest<T>(body: GithubCheckRun) {
    const owner = context.repo.owner;
    const repo = context.repo.repo;
    const endpoint = `POST /repos/${owner}/${repo}/check-runs`;
    return this.octokit.request(endpoint, body) as Promise<T>;
  }

  /**
   * @description Writes the Check Run to GitHub
   */
  async write() {
    console.log("Creating Check Runs using GitHub REST API...");

    let conclusion: "failure" | "success" | "neutral";
    if (this.hasHaltingError) {
      conclusion = "failure";
    } else {
      conclusion = this.issues.length === 0 ? "success" : "neutral";
    }

    const commit_id = this.context.payload?.pull_request
      ? this.context.payload.pull_request.head.sha
      : this.context.sha;

    if (this.issues) {
      const request: GithubCheckRun = {
        name: "sfdx-scanner",
        head_sha: commit_id,
        status: "completed",
        conclusion: conclusion,
        output: {
          title: "Results from sfdx-scanner",
          summary: `${this.issues.length} violations found`,
          annotations: this.issues,
        },
      };

      this.checkHasHaltingError();

      try {
        await this.performGithubRequest(request);
      } catch (error) {
        console.error(
          "Error when creating check run: " + JSON.stringify(error, null, 2)
        );
      }
    }
  }

  /**
   * @description Translates a violation object into an annotation
   * @param filePath File path that the violation took place in
   * @param violation sfdx-scanner violation
   * @param engine The engine that discovered the violation
   */
  translateViolationToReport(
    filePath: string,
    violation: ScannerViolation,
    engine: string
  ) {
    const violationType = getScannerViolationType(
      this.inputs,
      violation,
      engine
    );
    if (violationType === ERROR) {
      this.hasHaltingError = true;
    }
    let endLine = violation.endLine
      ? parseInt(violation.endLine)
      : parseInt(violation.line);
    let startLine = parseInt(violation.line);
    if (endLine === startLine) {
      endLine++;
    }
    this.issues.push({
      path: filePath,
      start_side: RIGHT,
      annotation_level: "notice",
      start_line: startLine,
      end_line: endLine,
      message: `${violation.category} ${violation.message}\n${violation.url}`,
      title: `${violation.ruleName} (sev: ${violation.severity})`,
    });
  }
}
```

Key change: `performGithubRequest` now uses `this.octokit` (inherited from BaseReporter, with throttling/retry) instead of creating `new Octokit()`.

- [ ] **Step 2: Update import in SfScannerPullRequest.ts**

In `src/SfScannerPullRequest.ts`, change the import on line 13 from:

```typescript
import { AnnotationsReporter } from "./reporter/annoations-reporter.js";
```

To:

```typescript
import { AnnotationsReporter } from "./reporter/annotations-reporter.js";
```

- [ ] **Step 3: Delete the typo-named file**

```bash
git rm src/reporter/annoations-reporter.ts
```

- [ ] **Step 4: Run tests to verify nothing breaks**

```bash
npx jest --verbose
```

Expected: All passing tests still pass.

- [ ] **Step 5: Commit**

```bash
git add src/reporter/annotations-reporter.ts src/SfScannerPullRequest.ts
git commit -m "fix: rename annoations-reporter to annotations-reporter, use inherited octokit"
```

---

### Task 7: Fix Duplicate GraphQL Call and Remove @ts-ignore in CommentsReporter

**Files:**
- Modify: `src/reporter/comments-reporter.ts`

- [ ] **Step 1: Refactor write() to eliminate duplicate fetchResolvedReviewCommentThreads call**

The `write()` method calls `filterOutExistingComments()` which internally calls `fetchResolvedReviewCommentThreads()`, and then `write()` calls `fetchResolvedReviewCommentThreads()` again. Fix by making `filterOutExistingComments` accept resolved comments as a parameter.

Replace the `filterOutExistingComments` method with:

```typescript
  /**
   * @description Filters out comments that already exist on the PR or have been resolved.
   * @param existingComments Comments already present on the PR
   * @param resolvedComments Comments that are part of resolved review threads
   * @private
   */
  private filterOutExistingComments(
    existingComments: GithubComment[],
    resolvedComments: GithubComment[]
  ): GithubComment[] {
    const newIssues = this.issues.filter((issue) => {
      return !existingComments.find((existingComment) =>
        this.matchComment(issue, existingComment)
      );
    });

    return newIssues.filter((issue) => {
      return !resolvedComments.find((resolvedComment) =>
        this.matchComment(issue, resolvedComment)
      );
    });
  }
```

Then update the `write()` method to fetch resolved comments once and pass them through:

```typescript
  async write() {
    this.logger(
      `Scanner found ${this.issues.length} issues on PR ${context.payload.pull_request?.number}. Note: some may be pre-existing or resolved.`
    );
    const existingComments = await this.getExistingComments();
    this.logger(
      `Found ${existingComments.length} existing comments with the hidden comment prefix indicating the Scanner as the author.`
    );

    // Fetch resolved review comment threads ONCE
    const resolvedComments = await this.fetchResolvedReviewCommentThreads();

    const netNewIssues = this.filterOutExistingComments(
      existingComments,
      resolvedComments
    );
    this.logger(
      `Found ${netNewIssues.length} new issues that do not have an existing comment or a resolved comment thread.`
    );

    if (this.inputs.deleteResolvedComments) {
      await this.deleteResolvedComments(this.issues, existingComments);
    }

    const unresolvedExistingComments = existingComments.filter(
      (existingComment) =>
        !resolvedComments.find((resolvedComment) =>
          this.matchComment(existingComment, resolvedComment)
        )
    );

    this.logger(
      `Found ${unresolvedExistingComments.length} unresolved existing comments.`
    );

    if (unresolvedExistingComments.length > 0) {
      this.logger(
        `Failing the build due to ${unresolvedExistingComments.length} unresolved existing comments.`
      );
      this.hasHaltingError = true;
      this.checkHasHaltingError();
    }

    if (netNewIssues.length === 0) {
      this.logger("No new issues to report.");
      return;
    }

    this.logger(
      `${
        this.issues.length - netNewIssues.length
      } pre-existing issues found. Creating a new review with ${
        netNewIssues.length
      } comments.`
    );
    await this.createOneReviewWithMultipleComments(netNewIssues);

    this.logger(
      "Comments have been written to the PR review. Check the PR for more details."
    );

    if (netNewIssues.length > 0) {
      this.logger(
        `Failing the build due to ${netNewIssues.length} new issues found.`
      );
      this.hasHaltingError = true;
    }

    this.checkHasHaltingError();
  }
```

- [ ] **Step 2: Fix the @ts-ignore in getExistingComments**

Replace the `getExistingComments` method. The `@ts-ignore` was needed because `performGithubRequest` returns a generic `T` but the paginate path returns an array. Fix by giving the GET path its own typed method:

```typescript
  /**
   * @description Get the existing Comments on the PR, filtered by if they include
   * the hidden comment prefix and if they were generated by a bot
   */
  private async getExistingComments(): Promise<GithubExistingComment[]> {
    try {
      const owner = context.repo.owner;
      const repo = context.repo.repo;
      const prNumber = context.payload.pull_request?.number;

      const endpoint = `GET /repos/${owner}/${repo}/${
        prNumber ? `pulls/${prNumber}` : `commits/${context.sha}`
      }/comments`;

      const result = (await this.octokit.paginate(
        endpoint
      )) as GithubExistingComment[];

      return result.filter(
        (comment) =>
          comment.body.includes(HIDDEN_COMMENT_PREFIX) &&
          comment.user.type === "Bot"
      );
    } catch (error) {
      console.error(
        "Error when fetching existing comments: " +
          JSON.stringify(error, null, 2)
      );
      return [];
    }
  }
```

Also remove the commented-out code in `translateViolationToReport`:
```typescript
    // if (violationType === ERROR) {
    //   this.hasHaltingError = true;
    // }
```

- [ ] **Step 3: Run tests to verify nothing breaks**

```bash
npx jest --verbose
```

Expected: All passing tests still pass.

- [ ] **Step 4: Commit**

```bash
git add src/reporter/comments-reporter.ts
git commit -m "fix: eliminate duplicate GraphQL call, remove @ts-ignore, remove dead code"
```

---

### Task 8: Add Tests for CommentsReporter

**Files:**
- Create: `tests/comments-reporter.test.ts`

- [ ] **Step 1: Write tests for the pure/testable parts of CommentsReporter**

Create `tests/comments-reporter.test.ts`:

```typescript
import { expect, it, describe, beforeEach } from "@jest/globals";
import { CommentsReporter } from "../src/reporter/comments-reporter";
import { GithubComment } from "../src/reporter/reporter.types";
import { PluginInputs } from "../src/common";
import { ScannerViolation } from "../src/sfdxCli.types";

jest.mock("@actions/github", () => ({
  context: {
    repo: { owner: "test-owner", repo: "test-repo" },
    payload: {
      pull_request: {
        number: 42,
        head: { sha: "abc123" },
      },
    },
    sha: "abc123",
  },
}));

jest.mock("@octokit/core", () => ({
  Octokit: {
    plugin: jest.fn().mockReturnValue({
      defaults: jest.fn().mockReturnValue(
        jest.fn().mockImplementation(() => ({
          request: jest.fn(),
          paginate: jest.fn(),
          graphql: jest.fn(),
        }))
      ),
    }),
  },
}));

jest.mock("@octokit/plugin-paginate-rest", () => ({
  paginateRest: {},
}));
jest.mock("@octokit/plugin-throttling", () => ({ throttling: {} }));
jest.mock("@octokit/plugin-retry", () => ({ retry: {} }));
jest.mock("@octokit/plugin-request-log", () => ({ requestLog: {} }));
jest.mock("@octokit/plugin-rest-endpoint-methods", () => ({
  legacyRestEndpointMethods: {},
}));
jest.mock("@octokit/auth-action", () => ({
  createActionAuth: jest.fn(),
}));

const { context } = jest.requireMock("@actions/github");

describe("CommentsReporter", () => {
  let reporter: CommentsReporter;
  const baseInputs: PluginInputs = {
    severityThreshold: 2,
    strictlyEnforcedRules: "",
    maxNumberOfComments: 100,
    commentBatchSize: 15,
    rateLimitWaitTime: 60000,
    rateLimitRetries: 5,
    deleteResolvedComments: false,
    reportMode: "comments",
    target: "",
    runFlowScanner: false,
    debug: true,
    exportSarif: false,
  };

  beforeEach(() => {
    reporter = new CommentsReporter({
      inputs: baseInputs,
      context: context,
    });
  });

  describe("matchComment", () => {
    it("should return true for comments with same line, path, and body content", () => {
      const commentA: GithubComment = {
        commit_id: "abc123",
        path: "src/Foo.cls",
        start_line: 5,
        start_side: "RIGHT",
        side: "RIGHT",
        line: 10,
        body: "<!--sfdx-scanner-->\n| col1 | val1 |\n| col2 | val2 |\n| File | [link](url) |",
      };
      const commentB: GithubComment = {
        commit_id: "def456",
        path: "src/Foo.cls",
        start_line: 5,
        start_side: "RIGHT",
        side: "RIGHT",
        line: 10,
        body: "<!--sfdx-scanner-->\n| col1 | val1 |\n| col2 | val2 |\n| File | [different-link](url2) |",
      };
      expect(reporter.matchComment(commentA, commentB)).toBe(true);
    });

    it("should return false for comments on different lines", () => {
      const commentA: GithubComment = {
        commit_id: "abc",
        path: "src/Foo.cls",
        start_line: 5,
        start_side: "RIGHT",
        side: "RIGHT",
        line: 10,
        body: "body|content|here|file|",
      };
      const commentB: GithubComment = {
        commit_id: "abc",
        path: "src/Foo.cls",
        start_line: 5,
        start_side: "RIGHT",
        side: "RIGHT",
        line: 20,
        body: "body|content|here|file|",
      };
      expect(reporter.matchComment(commentA, commentB)).toBe(false);
    });

    it("should return false for comments on different paths", () => {
      const commentA: GithubComment = {
        commit_id: "abc",
        path: "src/Foo.cls",
        start_line: 5,
        start_side: "RIGHT",
        side: "RIGHT",
        line: 10,
        body: "body|content|",
      };
      const commentB: GithubComment = {
        commit_id: "abc",
        path: "src/Bar.cls",
        start_line: 5,
        start_side: "RIGHT",
        side: "RIGHT",
        line: 10,
        body: "body|content|",
      };
      expect(reporter.matchComment(commentA, commentB)).toBe(false);
    });
  });

  describe("translateViolationToReport", () => {
    it("should add a comment to issues array", () => {
      const violation: ScannerViolation = {
        category: "Best Practices",
        column: "1",
        endColumn: "10",
        endLine: "15",
        line: "10",
        message: "Test message",
        ruleName: "TestRule",
        severity: 2,
        url: "https://example.com/rule",
      };

      reporter.translateViolationToReport("src/Foo.cls", violation, "pmd");

      expect((reporter as any).issues).toHaveLength(1);
      const comment = (reporter as any).issues[0];
      expect(comment.path).toBe("src/Foo.cls");
      expect(comment.start_line).toBe(10);
      expect(comment.line).toBe(15);
      expect(comment.body).toContain("<!--sfdx-scanner-->");
      expect(comment.body).toContain("pmd");
      expect(comment.body).toContain("TestRule");
      expect(comment.body).toContain("Test message");
    });

    it("should increment endLine when it equals startLine", () => {
      const violation: ScannerViolation = {
        category: "Cat",
        column: "1",
        endColumn: "1",
        endLine: "5",
        line: "5",
        message: "msg",
        ruleName: "R",
        severity: 1,
      };

      reporter.translateViolationToReport("src/Foo.cls", violation, "pmd");

      const comment = (reporter as any).issues[0];
      expect(comment.start_line).toBe(5);
      expect(comment.line).toBe(6);
    });

    it("should use line as endLine when endLine is empty", () => {
      const violation: ScannerViolation = {
        category: "Cat",
        column: "1",
        endColumn: "",
        endLine: "",
        line: "7",
        message: "msg",
        ruleName: "R",
        severity: 1,
      };

      reporter.translateViolationToReport("src/Foo.cls", violation, "pmd");

      const comment = (reporter as any).issues[0];
      expect(comment.start_line).toBe(7);
      expect(comment.line).toBe(8);
    });
  });

  describe("getFormattedBody", () => {
    it("should format a markdown table with all fields", () => {
      const violation: ScannerViolation = {
        category: "Security",
        column: "1",
        endColumn: "10",
        endLine: "15",
        line: "10",
        message: "  Avoid XSS  ",
        ruleName: "AvoidXSS",
        severity: 1,
        url: "https://pmd.github.io/rules/avoidxss",
      };

      const body = reporter.getFormattedBody(
        "pmd",
        "Error",
        violation,
        "src/Foo.cls",
        "abc123"
      );

      expect(body).toContain("<!--sfdx-scanner-->");
      expect(body).toContain("| Engine | pmd|");
      expect(body).toContain("| Category | Security |");
      expect(body).toContain("| Rule | AvoidXSS |");
      expect(body).toContain("| Severity | 1 |");
      expect(body).toContain("| Type | Error |");
      expect(body).toContain("[Avoid XSS]");
      expect(body).toContain("../tree/abc123/src/Foo.cls");
    });
  });
});
```

- [ ] **Step 2: Run the tests**

```bash
npx jest tests/comments-reporter.test.ts --verbose
```

Expected: All tests pass.

- [ ] **Step 3: Commit**

```bash
git add tests/comments-reporter.test.ts
git commit -m "test: add comprehensive tests for CommentsReporter"
```

---

### Task 9: Fix SarifUploader Bugs (Typo + Portability)

**Files:**
- Modify: `src/SarifUploader.ts`
- Create: `tests/sarif-uploader.test.ts`

- [ ] **Step 1: Write failing test for the base64 encoding**

Create `tests/sarif-uploader.test.ts`:

```typescript
import { expect, it, describe } from "@jest/globals";
import { gunzipSync } from "zlib";
import { compressAndEncode } from "../src/SarifUploader";

describe("compressAndEncode", () => {
  it("should gzip and base64 encode content", () => {
    const input = '{"version":"2.1.0","runs":[]}';
    const result = compressAndEncode(input);

    const decoded = Buffer.from(result, "base64");
    const decompressed = gunzipSync(decoded).toString();

    expect(decompressed).toBe(input);
  });

  it("should return a valid base64 string", () => {
    const input = "test content";
    const result = compressAndEncode(input);

    expect(result).toMatch(/^[A-Za-z0-9+/]+=*$/);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

```bash
npx jest tests/sarif-uploader.test.ts --verbose
```

Expected: FAIL - cannot import `compressAndEncode`

- [ ] **Step 3: Rewrite SarifUploader to use Node.js native encoding and fix typo**

Replace `src/SarifUploader.ts`:

```typescript
import * as core from "@actions/core";
import { gzipSync } from "zlib";
import { ScannerFlags } from "./sfdxCli.types.js";
import { Octokit } from "@octokit/action";
import { context } from "@actions/github";
import { fileExists } from "./common.js";
import fs from "fs";

/**
 * @description Compresses content with gzip and encodes to base64.
 * Uses Node.js built-in APIs instead of shell commands for portability.
 * @param content The string content to compress and encode
 * @returns Base64-encoded gzipped content
 */
export function compressAndEncode(content: string): string {
  const compressed = gzipSync(Buffer.from(content, "utf-8"));
  return compressed.toString("base64");
}

/**
 * @description This class is responsible for uploading the SARIF report to the GitHub code scanning API.
 */
export default class SarifUploader {
  private readonly sarifPath: string;
  private octokit: Octokit;

  constructor(scannerFlags: ScannerFlags) {
    this.sarifPath = scannerFlags.outfile;
    this.octokit = new Octokit();
  }

  /**
   * @description Uploads the SARIF report to the GitHub code scanning API.
   */
  async uploadSarifFileToCodeQL(): Promise<void> {
    console.log("Uploading SARIF report ...");
    try {
      const pullRequestNumber = context.payload.pull_request?.number;
      const ref = `refs/pull/${pullRequestNumber}/head`;
      const toolName = "SfScanner";

      if (pullRequestNumber && fileExists(this.sarifPath)) {
        const sarifContent = fs.readFileSync(this.sarifPath, "utf-8");
        const base64Data = compressAndEncode(sarifContent);

        await this.octokit.codeScanning.uploadSarif({
          owner: context.repo.owner,
          repo: context.repo.repo,
          commit_sha: context.sha,
          ref: ref,
          sarif: base64Data,
          tool_name: toolName,
        });

        core.info(
          `SARIF report uploaded successfully for pull request #${pullRequestNumber}`
        );
      } else {
        core.warning("No pull request found. Skipping SARIF upload.");
      }
    } catch (error: any) {
      core.setFailed(`Failed to upload SARIF report: ${error.message}`);
    }
  }
}
```

Key changes:
- Replaced shell `gzip | base64` pipeline with Node.js `zlib.gzipSync` + `Buffer.toString('base64')`
- Extracted `compressAndEncode` as an exported pure function for testing
- Fixed typo: `"SfScaner"` -> `"SfScanner"`
- Removed `spawn` import (no longer needed)

- [ ] **Step 4: Run tests**

```bash
npx jest tests/sarif-uploader.test.ts --verbose
```

Expected: Both tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/SarifUploader.ts tests/sarif-uploader.test.ts
git commit -m "fix: use Node.js native gzip/base64 for portability, fix SfScanner typo"
```

---

### Task 10: Fix git-actions.ts Shell Injection and Tests

**Files:**
- Modify: `src/git-actions.ts`
- Modify: `tests/git-actions.test.ts`

- [ ] **Step 1: Write tests with mocked execFileSync**

Replace `tests/git-actions.test.ts`:

```typescript
import { expect, it, describe, beforeEach } from "@jest/globals";
import { execFileSync } from "child_process";
import fs from "fs";
import { getDiffInPullRequest } from "../src/git-actions";

jest.mock("child_process");
jest.mock("fs");
jest.mock("@actions/github", () => ({
  context: {
    repo: { owner: "test-owner", repo: "test-repo" },
    sha: "abc123",
  },
}));

const sampleDiff = `diff --git a/src/Foo.cls b/src/Foo.cls
--- a/src/Foo.cls
+++ b/src/Foo.cls
@@ -1,3 +1,5 @@
 public class Foo {
+    public void bar() {
+        System.debug('hello');
+    }
 }
diff --git a/src/Bar.cls b/src/Bar.cls
deleted file mode 100644
--- a/src/Bar.cls
+++ /dev/null
@@ -1,3 +0,0 @@
-public class Bar {
-    // deleted
-}
`;

describe("getDiffInPullRequest", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (execFileSync as jest.Mock).mockReturnValue(Buffer.from(""));
    (fs.readFileSync as jest.Mock).mockReturnValue(sampleDiff);
    (fs.writeFileSync as jest.Mock).mockReturnValue(undefined);
  });

  it("should return changed lines mapped by file path", async () => {
    const result = await getDiffInPullRequest("main", "feature-branch");

    expect(result.has("src/Foo.cls")).toBe(true);
    const fooLines = result.get("src/Foo.cls")!;
    expect(fooLines.size).toBe(3);
  });

  it("should exclude deleted files (/dev/null)", async () => {
    const result = await getDiffInPullRequest("main", "feature-branch");
    expect(result.has("src/Bar.cls")).toBe(false);
  });

  it("should add destination remote when provided", async () => {
    await getDiffInPullRequest("main", "feature-branch", "https://github.com/org/repo.git");

    expect(execFileSync).toHaveBeenCalledWith(
      "git",
      ["remote", "add", "-f", "destination", "https://github.com/org/repo.git"],
      expect.anything()
    );
  });

  it("should not add destination remote when not provided", async () => {
    await getDiffInPullRequest("main", "feature-branch");

    const calls = (execFileSync as jest.Mock).mock.calls;
    const remoteAddCalls = calls.filter(
      (call: any[]) => call[0] === "git" && call[1]?.[0] === "remote"
    );
    expect(remoteAddCalls).toHaveLength(0);
  });

  it("should sanitize branch refs to prevent shell injection", async () => {
    await getDiffInPullRequest("main; rm -rf /", "feature; cat /etc/passwd");

    const diffCall = (execFileSync as jest.Mock).mock.calls.find(
      (call: any[]) => call[1]?.[0] === "diff"
    );
    expect(diffCall).toBeDefined();
    const refArg = diffCall![1][1] as string;
    expect(refArg).not.toContain(";");
  });
});
```

- [ ] **Step 2: Run to verify the shell injection test fails**

```bash
npx jest tests/git-actions.test.ts --verbose
```

Expected: The "should sanitize branch refs" test fails because the current code passes unsanitized refs to execSync.

- [ ] **Step 3: Update git-actions.ts with shell-safe exec and input sanitization**

Replace `src/git-actions.ts`:

```typescript
import parse from "parse-diff";
import fs from "fs";
import { context } from "@actions/github";
import { execFileSync } from "child_process";

const DIFF_OUTPUT = "diffBetweenCurrentAndParentBranch.txt";

export type GithubPullRequest = typeof context.payload.pull_request | undefined;

/**
 * @description Sanitizes a string for use as a git ref by removing
 * characters that could be used for shell injection.
 */
function sanitizeRef(ref: string): string {
  return ref.replace(/[^a-zA-Z0-9_./-]/g, "");
}

/**
 * @description Calculates the diff for all files within the pull request and
 * populates a map of filePath -> Set of changed line numbers
 */
export async function getDiffInPullRequest(
  baseRef: string,
  headRef: string,
  destination?: string
) {
  const safeBaseRef = sanitizeRef(baseRef);
  const safeHeadRef = sanitizeRef(headRef);

  if (destination) {
    execFileSync("git", ["remote", "add", "-f", "destination", destination], {
      stdio: "pipe",
    });
    execFileSync("git", ["remote", "update"], { stdio: "pipe" });
  }

  /**
   * Keeping git diff output in memory throws `code: 'ENOBUFS'` error when
   * called from within action. Writing to file, then reading avoids this error.
   */
  const diffOutput = execFileSync("git", [
    "diff",
    `destination/${safeBaseRef}...origin/${safeHeadRef}`,
  ]);
  fs.writeFileSync(DIFF_OUTPUT, diffOutput);

  const files = parse(fs.readFileSync(DIFF_OUTPUT).toString());
  const filePathToChangedLines = new Map<string, Set<number>>();
  for (const file of files) {
    if (file.to && file.to !== "/dev/null") {
      const changedLines = new Set<number>();
      for (const chunk of file.chunks) {
        for (const change of chunk.changes) {
          if (change.type === "add" || change.type === "del") {
            changedLines.add(change.ln);
          }
        }
      }
      filePathToChangedLines.set(file.to, changedLines);
    }
  }
  return filePathToChangedLines;
}
```

Key changes:
- Replaced `execSync` (shell-based) with `execFileSync` (no shell, arguments as array)
- Added `sanitizeRef()` as defense-in-depth
- Git diff output is written to file via `fs.writeFileSync` instead of shell redirection

- [ ] **Step 4: Run tests**

```bash
npx jest tests/git-actions.test.ts --verbose
```

Expected: All 5 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/git-actions.ts tests/git-actions.test.ts
git commit -m "fix: prevent shell injection in git commands, replace execSync with execFileSync"
```

---

### Task 11: Fix Minor Issues in SfScannerPullRequest

**Files:**
- Modify: `src/SfScannerPullRequest.ts`

- [ ] **Step 1: Fix String type and @desscription typo**

In `src/SfScannerPullRequest.ts`:

Line 102 - fix typo `@desscription` -> `@description`:
```typescript
  /**
   * @description validates that the execution context is a pull request, and that we have a valid target reference
   * @param pullRequest
   * @param target
   */
```

Line 208 - change `String` (object wrapper) to `string` (primitive):
```typescript
  private getFilesToScan(
    filePathToChangedLines: Map<string, Set<number>>,
    target: string
  ) {
```

- [ ] **Step 2: Run all tests**

```bash
npx jest --verbose
```

Expected: All tests pass.

- [ ] **Step 3: Commit**

```bash
git add src/SfScannerPullRequest.ts
git commit -m "fix: String type to string primitive, fix @desscription typo"
```

---

### Task 12: Add AnnotationsReporter Tests

**Files:**
- Create: `tests/annotations-reporter.test.ts`

- [ ] **Step 1: Write tests**

Create `tests/annotations-reporter.test.ts`:

```typescript
import { expect, it, describe, beforeEach } from "@jest/globals";
import { AnnotationsReporter } from "../src/reporter/annotations-reporter";
import { PluginInputs } from "../src/common";
import { ScannerViolation } from "../src/sfdxCli.types";

jest.mock("@actions/github", () => ({
  context: {
    repo: { owner: "test-owner", repo: "test-repo" },
    payload: {
      pull_request: {
        number: 42,
        head: { sha: "abc123" },
      },
    },
    sha: "abc123",
  },
}));

jest.mock("@octokit/core", () => ({
  Octokit: {
    plugin: jest.fn().mockReturnValue({
      defaults: jest.fn().mockReturnValue(
        jest.fn().mockImplementation(() => ({
          request: jest.fn(),
          paginate: jest.fn(),
        }))
      ),
    }),
  },
}));

jest.mock("@octokit/plugin-paginate-rest", () => ({ paginateRest: {} }));
jest.mock("@octokit/plugin-throttling", () => ({ throttling: {} }));
jest.mock("@octokit/plugin-retry", () => ({ retry: {} }));
jest.mock("@octokit/plugin-request-log", () => ({ requestLog: {} }));
jest.mock("@octokit/plugin-rest-endpoint-methods", () => ({
  legacyRestEndpointMethods: {},
}));
jest.mock("@octokit/auth-action", () => ({
  createActionAuth: jest.fn(),
}));

const { context } = jest.requireMock("@actions/github");

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
      inputs: baseInputs,
      context: context,
    });
  });

  describe("translateViolationToReport", () => {
    it("should create an annotation from a violation", () => {
      const violation: ScannerViolation = {
        category: "Best Practices",
        column: "1",
        endColumn: "10",
        endLine: "15",
        line: "10",
        message: "Test message",
        ruleName: "TestRule",
        severity: 2,
        url: "https://example.com/rule",
      };

      reporter.translateViolationToReport("src/Foo.cls", violation, "pmd");

      const issues = (reporter as any).issues;
      expect(issues).toHaveLength(1);
      expect(issues[0].path).toBe("src/Foo.cls");
      expect(issues[0].start_line).toBe(10);
      expect(issues[0].end_line).toBe(15);
      expect(issues[0].annotation_level).toBe("notice");
      expect(issues[0].message).toContain("Best Practices");
      expect(issues[0].message).toContain("Test message");
      expect(issues[0].title).toContain("TestRule");
      expect(issues[0].title).toContain("sev: 2");
    });

    it("should set hasHaltingError when violation meets severity threshold", () => {
      const violation: ScannerViolation = {
        category: "Security",
        column: "1",
        endColumn: "1",
        endLine: "5",
        line: "5",
        message: "Security issue",
        ruleName: "SecurityRule",
        severity: 1,
        url: "https://example.com",
      };

      reporter.translateViolationToReport("src/Foo.cls", violation, "pmd");

      expect((reporter as any).hasHaltingError).toBe(true);
    });

    it("should not set hasHaltingError for warnings", () => {
      const violation: ScannerViolation = {
        category: "Style",
        column: "1",
        endColumn: "1",
        endLine: "5",
        line: "5",
        message: "Style issue",
        ruleName: "StyleRule",
        severity: 3,
        url: "https://example.com",
      };

      reporter.translateViolationToReport("src/Foo.cls", violation, "pmd");

      expect((reporter as any).hasHaltingError).toBe(false);
    });

    it("should increment endLine when it equals startLine", () => {
      const violation: ScannerViolation = {
        category: "Cat",
        column: "1",
        endColumn: "1",
        endLine: "5",
        line: "5",
        message: "msg",
        ruleName: "R",
        severity: 3,
      };

      reporter.translateViolationToReport("src/Foo.cls", violation, "pmd");

      const annotation = (reporter as any).issues[0];
      expect(annotation.start_line).toBe(5);
      expect(annotation.end_line).toBe(6);
    });
  });
});
```

- [ ] **Step 2: Run the tests**

```bash
npx jest tests/annotations-reporter.test.ts --verbose
```

Expected: All 4 tests pass.

- [ ] **Step 3: Commit**

```bash
git add tests/annotations-reporter.test.ts
git commit -m "test: add AnnotationsReporter tests"
```

---

### Task 13: Run Full Test Suite and Verify Coverage

**Files:** None (verification only)

- [ ] **Step 1: Run the full test suite with coverage**

```bash
npx jest --coverage --verbose
```

Expected:
- All test suites pass (engine-selection, sarif-parser, sfdx-cli, common, comments-reporter, annotations-reporter, git-actions, sarif-uploader)
- No skipped test suites
- Coverage summary shows significant improvement:
  - `engine-selection.ts`: 100%
  - `sarif-parser.ts`: ~100%
  - `common.ts`: >90%
  - `sfdxCli.ts`: >70%
  - `git-actions.ts`: >80%
  - `SarifUploader.ts`: >50% (upload method still hard to test without GitHub)
  - Reporter files: >50% for translateViolationToReport, matchComment, getFormattedBody

- [ ] **Step 2: Identify remaining gaps and assess**

Review the coverage report. The main untested areas will be:
- `SfScannerPullRequest.ts` (orchestration class that depends on GitHub Actions context)
- GitHub API interaction methods in reporters (require integration tests)
- `SarifUploader.uploadSarifFileToCodeQL` (requires Octokit mock)

These are acceptable gaps - they require full GitHub Actions context mocking which is better addressed in integration tests.

- [ ] **Step 3: Commit any test adjustments needed**

If any tests needed tweaking, commit the fixes.

---

### Task 14: Build and Verify

**Files:** None (verification only)

- [ ] **Step 1: Run TypeScript compilation**

```bash
npx tsc --noEmit
```

Expected: No compilation errors.

- [ ] **Step 2: Run the full build**

```bash
npm run build
```

Expected: Build succeeds, `dist/index.js` is generated.

- [ ] **Step 3: Final commit of build output**

```bash
git add dist/
git commit -m "build"
```
