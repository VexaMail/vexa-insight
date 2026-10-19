/** How one receiver reports on one domain. */
export type ReporterCoverage = {
  readonly orgName: string
  /** Unix seconds of the end of its latest report. */
  readonly lastReportEnd: number
  readonly reportCount: number
  /** Reports in the 30 days up to its latest one. */
  readonly recentReportCount: number
  readonly daysSilent: number
  /**
   * True when a receiver that used to report most days has been quiet past
   * the stale threshold, while a sporadic one going quiet is not news.
   */
  readonly silent: boolean
}
