import { PluginInputs } from "../common.js";
import { ScannerViolation } from "../sfdxCli.types.js";
import { setFailed } from "@actions/core";
import {
  CustomOctokitWithPlugins,
  getCustomOctokitInstance,
  Reporter,
  ReporterProps,
} from "./reporter.types.js";

export abstract class BaseReporter<T> implements Reporter {
  private memoizedOctokit: CustomOctokitWithPlugins | null = null;
  protected hasHaltingError;
  protected inputs: PluginInputs;
  protected issues: T[];
  protected context;

  constructor({ context, inputs }: ReporterProps) {
    this.hasHaltingError = false;
    this.issues = [];
    this.context = context;
    this.inputs = inputs;
  }

  protected get octokit(): CustomOctokitWithPlugins {
    if (this.memoizedOctokit === null) {
      // Compute the value if it hasn't been memoized yet
      this.memoizedOctokit = this.getMemoizedOctokit();
    }
    return this.memoizedOctokit;
  }

  /**
   * @description This is a workaround for octokit/actions not supporting additional plugins.
   * octokit/actions is octokit/core with paginateRest and legacyRestEndpointMethods plugins.
   * This custom version includes the throttling plugin.
   */
  private getMemoizedOctokit(): CustomOctokitWithPlugins {
    return getCustomOctokitInstance();
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
