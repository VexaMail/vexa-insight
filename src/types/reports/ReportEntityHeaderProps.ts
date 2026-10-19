import type { ReactNode } from 'react'
import type { ReportDetailRow } from './ReportDetailRow'
import type { ReportStats } from './ReportStats'

export type ReportEntityHeaderProps = {
  readonly report: ReportDetailRow
  readonly stats: ReportStats
  readonly navigatorSlot?: ReactNode
}
