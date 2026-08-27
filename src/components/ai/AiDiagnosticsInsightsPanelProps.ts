import type {
  DiagnosticStats,
  DiagnosticsAdminGuide,
  DomainScore,
} from '@/types/diagnostics'

export type AiDiagnosticsInsightsPanelProps = {
  domainName: string
  domainId: number
  isAiConfigured: boolean
  score: DomainScore
  stats: DiagnosticStats
  guides: DiagnosticsAdminGuide[]
  startDate?: string | undefined
  endDate?: string | undefined
}
