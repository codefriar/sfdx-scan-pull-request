import { context } from "@actions/github";
export type GithubPullRequest = typeof context.payload.pull_request | undefined;
/**
 * @description Calculates the diff for all files within the pull request and
 * populates a map of filePath -> Set of changed line numbers
 */
export declare function getDiffInPullRequest(baseRef: string, headRef: string, destination?: string): Promise<Map<string, Set<number>>>;
