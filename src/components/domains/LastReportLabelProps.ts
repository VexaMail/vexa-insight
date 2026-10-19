export type LastReportLabelProps = {
  /** End of the newest report period, unix seconds. */
  readonly reportedAt: number | null | undefined
  /** UTC day of the newest report, for the silence check. */
  readonly lastReportDay: number | null | undefined
}
