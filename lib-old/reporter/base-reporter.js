"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseReporter = void 0;
const core_1 = require("@actions/core");
const reporter_types_1 = require("./reporter.types");
class BaseReporter {
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
        return (0, reporter_types_1.getCustomOctokitInstance)();
    }
    write() {
        throw new Error("Method not implemented.");
    }
    translateViolationToReport(_filePath, _violation, _engine) {
        throw new Error("Method not implemented.");
    }
    checkHasHaltingError() {
        if (this.hasHaltingError) {
            (0, core_1.setFailed)("One or more errors have been identified within the structure of the code that will need to be resolved before continuing.");
        }
    }
}
exports.BaseReporter = BaseReporter;
