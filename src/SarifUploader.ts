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
   * @description Filters the SARIF file to only include results that are in changed files and lines,
   * sorts by severity (most severe first - severity 1 is worst, 5 is least), and limits to 50 results maximum ACROSS ALL ENGINES.
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
    const maxResults = 50;

    // Track severity counts for original SARIF file
    const originalSeverityCounts = new Map<number, number>();
    const filteredSeverityCounts = new Map<number, number>();

    // Collect all filtered results across all runs with their metadata
    type ResultWithMetadata = {
      result: any;
      severity: number;
      runIndex: number;
    };
    const allFilteredResults: ResultWithMetadata[] = [];

    // Filter each run's results
    if (sarifJson.runs) {
      sarifJson.runs.forEach((run, runIndex) => {
        if (!run.results) {
          return;
        }

        const originalCount = run.results.length;
        totalResults += originalCount;

        // Create a map of rule IDs to their severity for sorting
        const ruleSeverityMap = new Map<string, number>();
        if (run.tool.driver.rules) {
          run.tool.driver.rules.forEach((rule) => {
            ruleSeverityMap.set(rule.id, rule.properties?.severity || 0);
          });
        }

        // Count original severities
        run.results.forEach((result) => {
          const severity = ruleSeverityMap.get(result.ruleId) || 0;
          originalSeverityCounts.set(severity, (originalSeverityCounts.get(severity) || 0) + 1);
        });

        // Filter results to only include those in changed files and lines
        const filteredResultsForRun = run.results.filter((result) => {
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

        // Add filtered results with metadata to the global list
        filteredResultsForRun.forEach((result) => {
          const severity = ruleSeverityMap.get(result.ruleId) || 0;
          allFilteredResults.push({
            result,
            severity,
            runIndex,
          });
        });

        console.log(`  Engine ${run.tool.driver.name}: ${originalCount} → ${filteredResultsForRun.length} results`);
      });
    }

    // Sort ALL results by severity (lowest number = most severe, so ascending order)
    // Severity 1 is most severe, 5 is least severe
    allFilteredResults.sort((a, b) => a.severity - b.severity);

    // Limit to 50 results total
    const limitedResults = allFilteredResults.slice(0, maxResults);

    // Count filtered severities
    limitedResults.forEach((item) => {
      filteredSeverityCounts.set(item.severity, (filteredSeverityCounts.get(item.severity) || 0) + 1);
    });

    // Distribute the limited results back to their respective runs
    if (sarifJson.runs) {
      // First, clear all results
      sarifJson.runs.forEach((run) => {
        if (run.results) {
          run.results = [];
        }
      });

      // Then, add back only the top 50 results
      limitedResults.forEach((item) => {
        if (sarifJson.runs && sarifJson.runs[item.runIndex].results) {
          sarifJson.runs[item.runIndex].results!.push(item.result);
        }
      });
    }

    const filteredResults = limitedResults.length;
    const totalFiltered = allFilteredResults.length;

    console.log(`Total results: ${totalResults} → ${totalFiltered} (after filtering to changed lines)`);
    if (totalFiltered > maxResults) {
      console.log(`Limited to top ${maxResults} most severe violations (severity 1 is most severe, from ${totalFiltered} filtered results)`);
    }

    // Display severity breakdown tables
    this.displaySeverityTable("Original SARIF File", originalSeverityCounts, totalResults);
    this.displaySeverityTable("Filtered SARIF File", filteredSeverityCounts, filteredResults);

    // Write the filtered SARIF to a new file
    fs.writeFileSync(this.filteredSarifPath, JSON.stringify(sarifJson, null, 2));
    console.log(`Filtered SARIF written to: ${this.filteredSarifPath}`);
  }

  /**
   * @description Displays a formatted table showing the count of issues by severity level
   * @param title The title for the table
   * @param severityCounts Map of severity level to count
   * @param total Total number of issues
   */
  private displaySeverityTable(title: string, severityCounts: Map<number, number>, total: number): void {
    console.log(`\n${title} - Issues by Severity:`);
    console.log('┌──────────┬───────────┐');
    console.log('│ Severity │   Count   │');
    console.log('├──────────┼───────────┤');

    // Get all severity levels and sort them in ascending order (1 is most severe, 5 is least)
    const severities = Array.from(severityCounts.keys()).sort((a, b) => a - b);

    if (severities.length === 0) {
      console.log('│   N/A    │     0     │');
    } else {
      severities.forEach((severity) => {
        const count = severityCounts.get(severity) || 0;
        const severityStr = severity.toString().padStart(8);
        const countStr = count.toString().padStart(9);
        console.log(`│${severityStr} │${countStr} │`);
      });
    }

    console.log('├──────────┼───────────┤');
    const totalStr = total.toString().padStart(9);
    console.log(`│  Total   │${totalStr} │`);
    console.log('└──────────┴───────────┘');
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
