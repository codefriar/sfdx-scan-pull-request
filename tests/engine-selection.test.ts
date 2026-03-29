import { expect, it, describe } from "@jest/globals";
import { getRequiredEngines } from "../src/engine-selection.ts";

describe("getRequiredEngines", () => {
  it("should return only Apex engines when only .cls files changed", () => {
    const files = [
      "force-app/main/default/classes/MyClass.cls",
      "force-app/main/default/classes/MyOtherClass.cls",
    ];

    const engines = getRequiredEngines(files);

    expect(engines).toContain("pmd");
    expect(engines).toContain("sfge");
    expect(engines).toContain("cpd");
    expect(engines).not.toContain("eslint");
    expect(engines).not.toContain("eslint-lwc");
    expect(engines).not.toContain("retire-js");
  });

  it("should return only Apex engines when only .trigger files changed", () => {
    const files = ["force-app/main/default/triggers/MyTrigger.trigger"];

    const engines = getRequiredEngines(files);

    expect(engines).toContain("pmd");
    expect(engines).toContain("sfge");
    expect(engines).toContain("cpd");
    expect(engines).not.toContain("eslint");
    expect(engines).not.toContain("eslint-lwc");
    expect(engines).not.toContain("retire-js");
  });

  it("should return only JS engines when only .js files changed", () => {
    const files = [
      "force-app/main/default/lwc/myComponent/myComponent.js",
      "force-app/main/default/lwc/myComponent/helper.js",
    ];

    const engines = getRequiredEngines(files);

    expect(engines).toContain("eslint");
    expect(engines).toContain("eslint-lwc");
    expect(engines).toContain("retire-js");
    expect(engines).toContain("cpd");
    expect(engines).not.toContain("pmd");
    expect(engines).not.toContain("sfge");
  });

  it("should return all engines when both .cls and .js files changed", () => {
    const files = [
      "force-app/main/default/classes/MyClass.cls",
      "force-app/main/default/lwc/myComponent/myComponent.js",
    ];

    const engines = getRequiredEngines(files);

    expect(engines).toContain("pmd");
    expect(engines).toContain("sfge");
    expect(engines).toContain("eslint");
    expect(engines).toContain("eslint-lwc");
    expect(engines).toContain("retire-js");
    expect(engines).toContain("cpd");
  });

  it("should include eslint engines for .ts files", () => {
    const files = ["src/utils/helper.ts"];

    const engines = getRequiredEngines(files);

    expect(engines).toContain("eslint");
    expect(engines).toContain("cpd");
    expect(engines).not.toContain("pmd");
    expect(engines).not.toContain("eslint-lwc");
  });

  it("should include HTML-relevant engines for .html files", () => {
    const files = [
      "force-app/main/default/lwc/myComponent/myComponent.html",
    ];

    const engines = getRequiredEngines(files);

    expect(engines).toContain("eslint");
    expect(engines).toContain("eslint-lwc");
    expect(engines).toContain("cpd");
    expect(engines).not.toContain("pmd");
    expect(engines).not.toContain("retire-js");
  });

  it("should return empty array when no files are provided", () => {
    const engines = getRequiredEngines([]);

    expect(engines).toEqual([]);
  });

  it("should return empty array for unknown file extensions", () => {
    const files = ["README.md", "package.json", ".gitignore"];

    const engines = getRequiredEngines(files);

    expect(engines).toEqual([]);
  });

  it("should intersect with user-specified engines", () => {
    const files = [
      "force-app/main/default/classes/MyClass.cls",
      "force-app/main/default/lwc/myComponent/myComponent.js",
    ];

    const engines = getRequiredEngines(files, "pmd");

    expect(engines).toEqual(["pmd"]);
  });

  it("should return empty when user engine does not match file types", () => {
    const files = ["force-app/main/default/lwc/myComponent/myComponent.js"];

    const engines = getRequiredEngines(files, "pmd");

    expect(engines).toEqual([]);
  });

  it("should handle multiple user-specified engines with comma separation", () => {
    const files = [
      "force-app/main/default/classes/MyClass.cls",
      "force-app/main/default/lwc/myComponent/myComponent.js",
    ];

    const engines = getRequiredEngines(files, "pmd, eslint");

    expect(engines).toContain("pmd");
    expect(engines).toContain("eslint");
    expect(engines).not.toContain("sfge");
    expect(engines).not.toContain("eslint-lwc");
  });

  it("should handle case-insensitive engine matching", () => {
    const files = ["force-app/main/default/classes/MyClass.cls"];

    const engines = getRequiredEngines(files, "PMD");

    expect(engines).toEqual(["pmd"]);
  });

  it("should handle empty user engines string as no filter", () => {
    const files = ["force-app/main/default/classes/MyClass.cls"];

    const engines = getRequiredEngines(files, "");

    expect(engines).toContain("pmd");
    expect(engines).toContain("sfge");
    expect(engines).toContain("cpd");
  });

  it("should handle file extensions case-insensitively", () => {
    const files = ["force-app/main/default/classes/MyClass.CLS"];

    const engines = getRequiredEngines(files);

    expect(engines).toContain("pmd");
    expect(engines).toContain("sfge");
    expect(engines).toContain("cpd");
  });
});
