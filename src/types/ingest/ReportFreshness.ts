/** How recent the newest stored report is, by arrival and by period. */
export type ReportFreshness = {
  /** When the newest report was parsed into the database. */
  readonly lastIngestedAt: Date | null
  /** End of the newest reporting period any receiver covered. */
  readonly lastPeriodEnd: Date | null
}
