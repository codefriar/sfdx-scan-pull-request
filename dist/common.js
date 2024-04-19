import fs from "fs";
export function fileExists(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        return true;
    }
    catch (err) {
        return false;
    }
}
export function getScannerViolationType(inputs, violation, engine) {
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
export function getGithubFilePath(commitId, filePath) {
    return ["..", "tree", commitId, filePath].join("/");
}
//# sourceMappingURL=common.js.map