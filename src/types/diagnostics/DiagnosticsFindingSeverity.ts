/** How urgent a diagnostics finding is; `pass` is a check with nothing to fix. */
export type DiagnosticsFindingSeverity =
  'critical' | 'high' | 'medium' | 'low' | 'info' | 'pass'
