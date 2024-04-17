export interface SarifResult {
  ruleId: string;
  message: { text: string };
  locations: {
    physicalLocation: {
      artifactLocation: { uri: string };
      region: {
        startLine: number;
        startColumn: number;
        endLine?: number;
        endColumn?: number;
      };
    };
  }[];
}

export interface SarifRule {
  id: string;
  shortDescription: { text: string };
  helpUri?: string;
  properties: { category: string; severity: number };
}

export interface SarifTool {
  driver: {
    name: string;
    rules: SarifRule[];
  };
}

export interface SarifRun {
  tool: SarifTool;
  results: SarifResult[];
}

export interface SarifDocument {
  version: string;
  runs: SarifRun[];
}
