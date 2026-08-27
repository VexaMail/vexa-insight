import type { ReportSource, ReportStats } from '@/types/reports'

export type AuthenticationSummaryProps = {
  stats: ReportStats
  sources: ReportSource[]
}
