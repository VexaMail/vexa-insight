import type { ReportDetailRow } from './ReportDetailRow'
import type { ReportSource } from './ReportSource'
import type { ReportTabKey } from './ReportTabKey'

export type ReportTabContentProps = {
  readonly tab: ReportTabKey
  readonly report: ReportDetailRow
  readonly sources: ReportSource[]
  readonly isAiConfigured: boolean
}
