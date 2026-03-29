import * as path from "path";

/**
 * @description Maps scanner engine names to the file extensions they analyze.
 */
const ENGINE_FILE_EXTENSIONS: Record<string, string[]> = {
  pmd: [".cls", ".trigger"],
  eslint: [".js", ".ts", ".html"],
  "eslint-lwc": [".js", ".html"],
  "retire-js": [".js"],
  sfge: [".cls", ".trigger"],
  cpd: [".cls", ".trigger", ".js", ".ts", ".html"],
};

/**
 * @description Determines which scanner engines are relevant based on the file
 * extensions present in the changed files. If the user explicitly specified
 * engines, the result is intersected with that list (only narrows, never expands).
 * @param filePaths List of file paths to be scanned
 * @param userEngines Comma-separated engine names from the user's action input
 * @return Array of engine names that should be executed
 */
export function getRequiredEngines(
  filePaths: string[],
  userEngines?: string
): string[] {
  const extensions = new Set(
    filePaths.map((filePath) => path.extname(filePath).toLowerCase())
  );

  const relevantEngines = Object.entries(ENGINE_FILE_EXTENSIONS)
    .filter(([, exts]) => exts.some((ext) => extensions.has(ext)))
    .map(([engine]) => engine);

  if (!userEngines) {
    return relevantEngines;
  }

  const requestedEngines = userEngines
    .split(",")
    .map((e) => e.trim().toLowerCase());

  return relevantEngines.filter((engine) => requestedEngines.includes(engine));
}
