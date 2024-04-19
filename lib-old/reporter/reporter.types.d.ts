import { PluginInputs } from "../common.ts";
import { ScannerViolation } from "../sfdxCli.types.ts";
import { Context } from "@actions/github/lib/context.ts";
import { Octokit } from "@octokit/core";
import { PaginateInterface } from "@octokit/plugin-paginate-rest";
import { RequestError } from "@octokit/request-error";
type MyOctokit = Octokit & {
    paginate: PaginateInterface;
} & {
    legacyRestEndpointMethods: {
        retry: {
            retryRequest: (error: RequestError, retries: number, retryAfter: number) => RequestError;
        };
    };
};
export type GithubCheckRun = {
    name: string;
    head_sha: string;
    status: string;
    conclusion: "action_required" | "cancelled" | "failure" | "neutral" | "success" | "skipped" | "stale" | "timed_out";
    output: {
        title: string;
        summary: string;
        annotations: GithubAnnotation[];
    };
};
export type GithubAnnotation = {
    path: string;
    start_side: string;
    annotation_level: "notice";
    start_line: number;
    end_line: number;
    message: string;
    title: string;
};
export type GithubComment = {
    commit_id: string;
    path: string;
    start_line: number;
    start_side: GithubCommentSide;
    side: GithubCommentSide;
    line: number;
    body: string;
    url?: string;
};
export type GithubExistingComment = GithubComment & {
    user: {
        type: "Bot" | "User";
    };
    id?: string;
};
export type ReporterProps = {
    context: Context;
    inputs: PluginInputs;
};
export interface Reporter {
    write(): void;
    translateViolationToReport(filePath: string, violation: ScannerViolation, engine: string): void;
}
type GithubCommentSide = "RIGHT";
export declare abstract class BaseReporter<T> implements Reporter {
    private memoizedOctokit;
    protected hasHaltingError: boolean;
    protected inputs: PluginInputs;
    protected issues: T[];
    protected context: Context;
    constructor({ context, inputs }: ReporterProps);
    protected get octokit(): MyOctokit;
    /**
     * @description This is a workaround for octokit/actions not supporting additional plugins.
     * octokit/actions is octokit/core with paginateRest and legacyRestEndpointMethods plugins.
     * This custom version includes the throttling plugin.
     */
    private getMemoizedOctokit;
    write(): void;
    translateViolationToReport(_filePath: string, _violation: ScannerViolation, _engine: string): void;
    checkHasHaltingError(): void;
}
export {};
