import type { ReportAlignmentCounts } from './ReportAlignmentCounts'
import type { ReportDetailRow } from './ReportDetailRow'
import type { ReportSource } from './ReportSource'
import type { ReportStats } from './ReportStats'

/** Everything the report page renders. */
export type ReportDetailData = {
  readonly report: ReportDetailRow
  readonly stats: ReportStats
  readonly sources: ReportSource[]
  /** The receiver's latest reports about the domain, oldest first. */
  readonly history: ReportAlignmentCounts[]
}
