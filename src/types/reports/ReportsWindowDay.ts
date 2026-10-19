import type { ReportsWindowSummary } from './ReportsWindowSummary'

/** The reports-window totals of one UTC day, by the day its period ends. */
export type ReportsWindowDay = ReportsWindowSummary & {
  /** Days since the Unix epoch. */
  readonly day: number
}
