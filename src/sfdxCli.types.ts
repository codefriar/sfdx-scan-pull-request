export type ScannerFinding = {
  fileName: string;
  engine: string;
  violations: ScannerViolation[];
};

export type ScannerFlags = {
  category?: string;
  engine?: string;
  env?: string;
  eslintconfig?: string;
  pmdconfig?: string;
  target: string;
  tsConfig?: string;
  exportSarif?: boolean;
  format: string;
  outfile: string;
};

export type ScannerViolation = {
  category: string;
  column: string;
  endColumn: string;
  endLine: string;
  line: string;
  message: string;
  ruleName: string;
  severity: number;
  url?: string;
};

export type ScannerViolationType = "Error" | "Warning";

export type SfdxCommandResult<T> = {
  status: 1 | 0;
  result: T;
};
