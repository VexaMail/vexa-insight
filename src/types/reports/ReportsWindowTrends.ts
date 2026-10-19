/**
 * One value per UTC day of the reports window, oldest first, for the KPI
 * sparklines; a day without reports is 0, and its failing share 0 too.
 */
export type ReportsWindowTrends = {
  readonly reports: readonly number[]
  readonly reporters: readonly number[]
  readonly messages: readonly number[]
  /** Whole percentage of the day's messages failing DMARC. */
  readonly failingShare: readonly number[]
}
