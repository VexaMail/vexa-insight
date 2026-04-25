import type { ReportDetailRow } from '@/types/reports'

export type ReportHeaderProps = {
  report: ReportDetailRow
  backHref: string
  backLabel: React.ReactNode
  navigatorSlot: React.ReactNode
}
