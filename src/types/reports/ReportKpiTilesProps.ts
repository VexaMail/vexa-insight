import type { ReportKpiTrends } from './ReportKpiTrends'
import type { ReportStats } from './ReportStats'

export type ReportKpiTilesProps = {
  readonly stats: ReportStats
  /** The receiver's previous reports about the domain, for the sparklines. */
  readonly trends: ReportKpiTrends
}
