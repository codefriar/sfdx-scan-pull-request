/**
 * @description represents a command line tool's execution error result.
 */
export interface ExecSyncError {
  status: string;
  stack: string;
  output?: Buffer;
  message: string;
}
