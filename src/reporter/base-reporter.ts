import { PluginInputs } from "../common.js";
import { ScannerViolation } from "../sfdxCli.types.js";
import { setFailed } from "@actions/core";
import { Reporter, ReporterProps } from "./reporter.types.js";
import { Octokit } from "@octokit/core";
import { paginateRest } from "@octokit/plugin-paginate-rest";
import { throttling } from "@octokit/plugin-throttling";
import { retry } from "@octokit/plugin-retry";
import { createActionAuth } from "@octokit/auth-action";

const CustomOctokit = Octokit.plugin(paginateRest, throttling, retry).defaults({
  throttle: {
    onRateLimit: (retryAfter, options) => {
      console.warn(
        `Request quota exhausted for request ${options.method} ${options.url}. Retrying after ${retryAfter} seconds!`
      );
      return true;
    },
    onSecondaryRateLimit: (retryAfter, options) => {
      console.warn(
        `Secondary rate limit detected for request ${options.method} ${options.url}`
      );
      if (options.request.retryCount <= 5) {
        console.log(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
      return false;
    },
  },
  authStrategy: createActionAuth,
  userAgent: `my-octokit-action/v1.2.3`,
});

export abstract class BaseReporter<T> implements Reporter {
  protected hasHaltingError;
  protected inputs: PluginInputs;
  protected issues: T[];
  protected context;
  protected octokit = new CustomOctokit();

  constructor({ context, inputs }: ReporterProps) {
    this.hasHaltingError = false;
    this.issues = [];
    this.context = context;
    this.inputs = inputs;
  }

  write(): void {
    throw new Error("Method not implemented.");
  }

  translateViolationToReport(
    _filePath: string,
    _violation: ScannerViolation,
    _engine: string
  ): void {
    throw new Error("Method not implemented.");
  }

  checkHasHaltingError() {
    if (this.hasHaltingError) {
      setFailed(
        "One or more errors have been identified within the structure of the code that will need to be resolved before continuing."
      );
    }
  }
}
