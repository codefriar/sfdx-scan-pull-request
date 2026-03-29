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
      (execSync as jest.Mock).mockReturnValue(JSON.stringify({ result: null }));
      (fs.accessSync as jest.Mock).mockReturnValue(undefined);
      (fs.readFileSync as jest.Mock).mockReturnValue(sarifFixture);

      const result = await sfCLI.getFindingsForFiles();
      expect(result).toHaveLength(3);
      expect(result[0].engine).toBe("pmd");
      expect(result[0].violations.length).toBeGreaterThan(0);
    });

    it("should throw when SARIF output file not found", async () => {
      (execSync as jest.Mock).mockReturnValue(JSON.stringify({ result: null }));
      (fs.accessSync as jest.Mock).mockImplementation(() => { throw new Error("ENOENT"); });

      await expect(sfCLI.getFindingsForFiles()).rejects.toThrow("SARIF output file not found");
    });

    it("should throw when CLI execution fails", async () => {
      const error = new Error("Scanner crashed");
      (execSync as jest.Mock).mockImplementation(() => { throw error; });

      await expect(sfCLI.getFindingsForFiles()).rejects.toThrow(error);
    });
  });

  describe("registerRule", () => {
    it("should call sf scanner rule add with correct args", async () => {
      (execSync as jest.Mock).mockReturnValue(JSON.stringify({ result: "Rule added" }));

      const result = await sfCLI.registerRule("/path/to/rule.jar", "apex");
      expect(execSync).toHaveBeenCalledWith(
        expect.stringContaining('scanner rule add --path="/path/to/rule.jar" --language="apex" --json'),
        expect.anything()
      );
      expect(result).toBe("Rule added");
    });

    it("should throw when registering rule fails", async () => {
      const error = new Error("Rule registration failed");
      (execSync as jest.Mock).mockImplementation(() => { throw error; });
      await expect(sfCLI.registerRule("path", "language")).rejects.toThrow(error);
    });
  });
});
