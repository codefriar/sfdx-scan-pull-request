import { expect, it, describe } from "@jest/globals";
import { execSync } from "child_process";
import SfCLI from "../src/sfdxCli.ts";
import { ScannerFlags } from "../src/sfdxCli.types.ts";
import fs from "fs";

const thirtySecondsRunTime = 1000 * 30;

jest.mock("child_process");
jest.mock("fs");

describe("SfCLI", () => {
  let sfCLI: SfCLI;
  let scannerFlags: ScannerFlags;

  beforeEach(() => {
    scannerFlags = {
      configFile: "tests/code-analyzer-config.yml",
      outfile: "sfca-results.sarif",
    };
    sfCLI = new SfCLI(scannerFlags);
    jest.resetAllMocks();
  });

  describe("getFindingsForFiles", () => {
    it("should run code analyzer and parse SARIF file", async () => {
      const mockSarifContent = JSON.stringify({
        version: "2.1.0",
        runs: [
          {
            tool: {
              driver: {
                name: "pmd",
                rules: [
                  {
                    id: "TestRule",
                    properties: {
                      category: "Code Style",
                      severity: 1,
                    },
                    helpUri: "https://example.com",
                  },
                ],
              },
            },
            results: [
              {
                ruleId: "TestRule",
                message: { text: "Test violation" },
                locations: [
                  {
                    physicalLocation: {
                      artifactLocation: { uri: "test.cls" },
                      region: {
                        startLine: 1,
                        startColumn: 1,
                        endLine: 1,
                        endColumn: 10,
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      });

      (execSync as jest.Mock).mockReturnValue(undefined);
      (fs.readFileSync as jest.Mock).mockReturnValue(mockSarifContent);
      (fs.accessSync as jest.Mock).mockReturnValue(undefined);

      const result = await sfCLI.getFindingsForFiles();

      expect(result).toHaveLength(1);
      expect(result[0].engine).toBe("pmd");
      expect(result[0].violations).toHaveLength(1);
      expect(result[0].violations[0].ruleName).toBe("TestRule");
    });

    it("should handle errors when SARIF file not found", async () => {
      (execSync as jest.Mock).mockReturnValue(undefined);
      (fs.accessSync as jest.Mock).mockImplementation(() => {
        throw new Error("File not found");
      });

      await expect(sfCLI.getFindingsForFiles()).rejects.toThrow(
        "SARIF output file not found"
      );
    });

    it("should handle errors when running code analyzer", async () => {
      const error = new Error("Test error");
      (execSync as jest.Mock).mockImplementation(() => {
        throw error;
      });

      await expect(sfCLI.getFindingsForFiles()).rejects.toThrow(error);
    });
  });
});
