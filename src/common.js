"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGithubFilePath = exports.getScannerViolationType = exports.fileExists = void 0;
const fs_1 = __importDefault(require("fs"));
const sfdxCli_types_1 = require("./sfdxCli.types");
function fileExists(filePath) {
    try {
        fs_1.default.accessSync(filePath, fs_1.default.constants.F_OK);
        return true;
    }
    catch (err) {
        return false;
    }
}
exports.fileExists = fileExists;
function getScannerViolationType(inputs, violation, engine) {
    if (inputs.severityThreshold >= violation.severity) {
        return "Error";
    }
    if (!inputs.strictlyEnforcedRules) {
        return "Warning";
    }
    let violationDetail = {
        engine: engine,
        category: violation.category,
        rule: violation.ruleName,
    };
    for (let enforcedRule of JSON.parse(inputs.strictlyEnforcedRules)) {
        if (Object.entries(violationDetail).toString() ===
            Object.entries(enforcedRule).toString()) {
            return "Error";
        }
    }
    return "Warning";
}
exports.getScannerViolationType = getScannerViolationType;
function getGithubFilePath(commitId, filePath) {
    return ["..", "tree", commitId, filePath].join("/");
}
exports.getGithubFilePath = getGithubFilePath;
