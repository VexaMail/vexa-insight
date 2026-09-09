import type { DiagnosticsAdminGuide } from './DiagnosticsAdminGuide'
import type { DiagnosticStats } from './DiagnosticStats'
import type { DnsDiagnostics } from './DnsDiagnostics'
import type { DomainScore } from './DomainScore'

/** Everything the diagnostics page renders for one domain and window. */
export type DomainDiagnosticsData = {
  readonly domains: { id: number; name: string }[]
  readonly stats: DiagnosticStats
  readonly dns: DnsDiagnostics
  readonly score: DomainScore
  readonly guides: DiagnosticsAdminGuide[]
}
