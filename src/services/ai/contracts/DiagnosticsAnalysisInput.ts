import type { DiagnosticsAdminGuideSummary } from './DiagnosticsAdminGuideSummary'
import type { DiagnosticsDnsSummary } from './DiagnosticsDnsSummary'
import type { DiagnosticsReportAggregate } from './DiagnosticsReportAggregate'
import type { DiagnosticsScoreSummary } from './DiagnosticsScoreSummary'
import type { DiagnosticsStatsSummary } from './DiagnosticsStatsSummary'

/** Complete input contract for the diagnostics AI analysis. */
export type DiagnosticsAnalysisInput = {
  domainName: string
  score: DiagnosticsScoreSummary | null
  dns: DiagnosticsDnsSummary | null
  stats: DiagnosticsStatsSummary | null
  reportAggregate: DiagnosticsReportAggregate | null
  adminGuides: DiagnosticsAdminGuideSummary[]
}
