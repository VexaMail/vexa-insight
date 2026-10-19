import type { ReportDetailData } from './ReportDetailData'
import type { ReportTabKey } from './ReportTabKey'

export type ReportDetailViewProps = {
  readonly data: ReportDetailData
  readonly tab: ReportTabKey
  /** The domain the report was opened from, kept on the tab links. */
  readonly fromDomain: string | undefined
  readonly isAiConfigured: boolean
}
