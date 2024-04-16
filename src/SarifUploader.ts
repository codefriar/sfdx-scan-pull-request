import * as core from "@actions/core";
import { ScannerFlags } from "./sfdxCli";
import { Octokit } from "@octokit/action";
import { context } from "@actions/github";
import { fileExists } from "./common";
import { spawn } from "node:child_process";

class SarifUploader {
  private readonly sarifPath: string;
  private octokit: Octokit;

  constructor(scannerFlags: ScannerFlags) {
    this.sarifPath = scannerFlags.outfile;
    this.octokit = new Octokit();
  }

  async upload(): Promise<void> {
    try {
      let base64Data = await this.zipAndEncodeSarif();

      const pullRequestNumber = context.payload.pull_request?.number;
      const ref = `refs/pull/${pullRequestNumber}/head`;
      const toolName = "SfScaner";

      if (pullRequestNumber && fileExists(this.sarifPath)) {
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

  private async zipAndEncodeSarif(): Promise<string> {
    return await this.exec(this.sarifPath);
  }

  private async exec(sarifPath: string): Promise<string> {
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

export default SarifUploader;
