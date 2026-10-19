import type { ReportStats } from './ReportStats'

export type ReportKpiTilesProps = {
  readonly stats: ReportStats
  /** Distinct source IPs in the report, the denominator of "requiring review". */
  readonly sourceCount: number
}
