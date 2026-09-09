/** The date bounds the diagnostics page queries, both open when unfiltered. */
export type DiagnosticsQueryWindow = {
  readonly queryFromDate: Date | undefined
  readonly queryToDate: Date | undefined
}
