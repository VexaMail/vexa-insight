import type { ReportDetailRow } from './ReportDetailRow'
import type { ReportSource } from './ReportSource'
import type { ReportStats } from './ReportStats'

export type ReportFactsStripProps = {
  readonly report: ReportDetailRow
  readonly stats: ReportStats
  /** Distinct source IPs, the denominator of the sources to review. */
  readonly sourceCount: number
  readonly sources: readonly ReportSource[]
}
