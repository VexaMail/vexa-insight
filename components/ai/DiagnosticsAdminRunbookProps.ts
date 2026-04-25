import type {
  DiagnosticStats,
  DiagnosticsAdminGuide,
  DomainScore,
} from '@/types/diagnostics'

export type DiagnosticsAdminRunbookProps = {
  domainName: string
  score: DomainScore
  stats: DiagnosticStats
  guides: DiagnosticsAdminGuide[]
}
