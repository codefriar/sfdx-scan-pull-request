import { setFailed } from "@actions/core";
import { getCustomOctokitInstance, } from "./reporter.types.js";
export class BaseReporter {
    constructor({ context, inputs }) {
        this.memoizedOctokit = null;
        this.hasHaltingError = false;
        this.issues = [];
        this.context = context;
        this.inputs = inputs;
    }
    get octokit() {
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
    getMemoizedOctokit() {
        return getCustomOctokitInstance();
    }
    write() {
        throw new Error("Method not implemented.");
    }
    translateViolationToReport(_filePath, _violation, _engine) {
        throw new Error("Method not implemented.");
    }
    checkHasHaltingError() {
        if (this.hasHaltingError) {
            setFailed("One or more errors have been identified within the structure of the code that will need to be resolved before continuing.");
        }
    }
}
//# sourceMappingURL=base-reporter.js.map