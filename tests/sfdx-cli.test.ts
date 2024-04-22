import { expect, it, describe } from "@jest/globals";
import { execSync } from "child_process";
import SfCLI from "../src/sfdxCli.ts";
import { ScannerFlags, ScannerViolation } from "../src/sfdxCli.types.ts";

const thirtySecondsRunTime = 1000 * 30;

jest.mock("child_process");

describe("SfCLI", () => {
  let sfCLI: SfCLI;
  let scannerFlags: ScannerFlags;

  beforeEach(() => {
    scannerFlags = {
      engine: "pmd",
      pmdconfig: undefined,
      target: "tests/ExampleClass.cls",
      format: "json",
      outfile: "sfdx-scan.sarif",
    };
    sfCLI = new SfCLI(scannerFlags);
    jest.resetAllMocks();
  });

  describe("getFindingsForFiles", () => {
    it("should return findings for files", async () => {
      const violation: ScannerViolation = {
        category: "Code Style",
        column: "1",
        endColumn: "1",
        endLine: "1",
        line: "1",
        message: "Test violation",
        ruleName: "TestRule",
        severity: 1,
        url: "https://example.com",
      };

      (execSync as jest.Mock).mockReturnValue(
        JSON.stringify({ result: violation })
      );

      const result = await sfCLI.getFindingsForFiles();

      expect(result).toEqual(violation);
    });

    it("should handle errors when getting findings for files", async () => {
      const error = new Error("Test error");
      (execSync as jest.Mock).mockImplementation(() => {
        throw error;
      });

      await expect(sfCLI.getFindingsForFiles()).rejects.toThrow(error);
    });
  });

  describe("cli", () => {
    it("should execute a sfdx command on the command line", async () => {
      const mockResult: ScannerViolation = {
        category: "Code Style",
        column: "1",
        endColumn: "1",
        endLine: "1",
        line: "1",
        message: "Test violation",
        ruleName: "TestRule",
        severity: 1,
        url: "https://example.com",
      };

      (execSync as jest.Mock).mockReturnValue(
        JSON.stringify({ result: mockResult })
      );

      // @ts-ignore
      const result = await sfCLI.cli("scanner run");

      expect(result).toEqual(mockResult);
    });

    it("should handle errors when executing a sfdx command", async () => {
      const error = new Error("Test error");
      (execSync as jest.Mock).mockImplementation(() => {
        throw error;
      });

      await expect(sfCLI.cli("scanner run")).rejects.toThrow(error);
    });
  });

  describe("registerRule", () => {
    it("should register a new rule with the scanner", async () => {
      const mockResult = {
        // populate with mock data
      };

      (execSync as jest.Mock).mockReturnValue(
        JSON.stringify({ result: mockResult })
      );

      const result = await sfCLI.registerRule("path", "language");

      expect(result).toEqual(mockResult);
    });

    it("should handle errors when registering a new rule", async () => {
      const error = new Error("Test error");
      (execSync as jest.Mock).mockImplementation(() => {
        throw error;
      });

      await expect(sfCLI.registerRule("path", "language")).rejects.toThrow(
        error
      );
    });
  });
});
