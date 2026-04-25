import type { DiagnosticStats } from '@/types/diagnostics'

export type DiagnosticsExecutiveSummaryProps = {
  stats: DiagnosticStats
  dmarcPolicy: string | null
}
