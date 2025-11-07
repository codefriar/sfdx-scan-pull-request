import * as core from "@actions/core";
import { ScannerFlags } from "./sfdxCli.types.js";
import { Octokit } from "@octokit/action";
import { context } from "@actions/github";
import { fileExists } from "./common.js";
import { spawn } from "node:child_process";
import fs from "fs";
import { SarifDocument } from "./sarif.types.js";

/**
 * @description This class is responsible for uploading the SARIF report to the GitHub code scanning API.
 * It filters the SARIF file to only include violations in changed files and lines before uploading.
 */
export default class SarifUploader {
  private readonly sarifPath: string;
  private readonly filteredSarifPath: string;
  private octokit: Octokit;

  constructor(scannerFlags: ScannerFlags) {
    this.sarifPath = scannerFlags.outfile;
    this.filteredSarifPath = scannerFlags.outfile.replace('.sarif', '-filtered.sarif');
    this.octokit = new Octokit();
  }

  /**
   * @description Filters the SARIF file to only include results for changed files and lines,
   * then uploads it to the GitHub code scanning API.
   * @param filePathToChangedLines Map of file paths to the set of changed line numbers
   */
  async uploadSarifFileToCodeQL(filePathToChangedLines: Map<string, Set<number>>): Promise<void> {
    console.log("Filtering and uploading SARIF report ...");
    try {
      // Filter the SARIF file to only include violations in changed lines
      await this.filterSarifFile(filePathToChangedLines);

      let base64Data = await this.execShellCmds(this.filteredSarifPath);

      const pullRequestNumber = context.payload.pull_request?.number;
      const ref = `refs/pull/${pullRequestNumber}/head`;
      const toolName = "SfScaner";

      if (pullRequestNumber && fileExists(this.filteredSarifPath)) {
        await this.octokit.codeScanning.uploadSarif({
          owner: context.repo.owner,
          repo: context.repo.repo,
          commit_sha: context.sha,
          ref: ref,
          sarif: base64Data,
          tool_name: toolName,
        });

        core.info(
          `Filtered SARIF report uploaded successfully for pull request #${pullRequestNumber}`
        );
      } else {
        core.warning("No pull request found. Skipping SARIF upload.");
      }
    } catch (error: any) {
      core.setFailed(`Failed to upload SARIF report: ${error.message}`);
    }
  }

  /**
   * @description Filters the SARIF file to only include results that are in changed files and lines
   * @param filePathToChangedLines Map of file paths to the set of changed line numbers
   */
  private async filterSarifFile(filePathToChangedLines: Map<string, Set<number>>): Promise<void> {
    console.log(`Filtering SARIF file: ${this.sarifPath}`);

    if (!fileExists(this.sarifPath)) {
      throw new Error(`SARIF file not found at: ${this.sarifPath}`);
    }

    const sarifContent = fs.readFileSync(this.sarifPath, "utf-8");
    const sarifJson: SarifDocument = JSON.parse(sarifContent);

    let totalResults = 0;
    let filteredResults = 0;

    // Filter each run's results
    if (sarifJson.runs) {
      sarifJson.runs.forEach((run) => {
        if (!run.results) {
          return;
        }

        const originalCount = run.results.length;
        totalResults += originalCount;

        // Filter results to only include those in changed files and lines
        run.results = run.results.filter((result) => {
          // Skip if no locations
          if (!result.locations || result.locations.length === 0) {
            return false;
          }

          const location = result.locations[0].physicalLocation;

          // Skip if location structure is invalid
          if (!location || !location.artifactLocation || !location.artifactLocation.uri) {
            return false;
          }

          const filePath = location.artifactLocation.uri
            .replace(process.cwd() + "/", "")
            .replace("file:", "");

          // Check if this file has any changed lines
          const changedLines = filePathToChangedLines.get(filePath);
          if (!changedLines || changedLines.size === 0) {
            return false;
          }

          // Check if the violation is within the changed lines
          const startLine = location.region?.startLine || 0;
          const endLine = location.region?.endLine || startLine;

          // Check if any line in the violation range is in the changed lines
          for (let line = startLine; line <= endLine; line++) {
            if (changedLines.has(line)) {
              return true;
            }
          }

          return false;
        });

        filteredResults += run.results.length;
        console.log(`  Engine ${run.tool.driver.name}: ${originalCount} → ${run.results.length} results`);
      });
    }

    console.log(`Total results: ${totalResults} → ${filteredResults} (filtered to changed lines only)`);

    // Write the filtered SARIF to a new file
    fs.writeFileSync(this.filteredSarifPath, JSON.stringify(sarifJson, null, 2));
    console.log(`Filtered SARIF written to: ${this.filteredSarifPath}`);
  }

  /**
   * @description Executes the gzip and base64 commands to compress and encode the SARIF report.
   * @param sarifPath path to the SARIF report.
   */
  private async execShellCmds(sarifPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const gzipCommand = spawn("gzip", ["-c", sarifPath]);
      const base64Command = spawn("base64", ["-w0"]);

      gzipCommand.stdout.pipe(base64Command.stdin);

      let base64Output = "";

      base64Command.stdout.on("data", (data) => {
        base64Output += data.toString();
      });

      base64Command.on("close", (code) => {
        if (code === 0) {
          resolve(base64Output);
        } else {
          reject(new Error(`Command execution failed with code ${code}`));
        }
      });

      gzipCommand.on("error", (error) => {
        reject(error);
      });

      base64Command.on("error", (error) => {
        reject(error);
      });
    });
  }
}
