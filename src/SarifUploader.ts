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

        core.info(`SARIF report uploaded successfully for pull request #${pullRequestNumber}`);
      } else {
        core.warning("No pull request found. Skipping SARIF upload.");
      }
    } catch (error: any) {
      core.setFailed(`Failed to upload SARIF report: ${error.message}`);
    }
  }
}
