import type { DiagnosticsAdminGuide } from './DiagnosticsAdminGuide'
import type { DiagnosticsFinding } from './DiagnosticsFinding'
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
  readonly findings: readonly DiagnosticsFinding[]
  /** ISO timestamp of the live DNS run. */
  readonly checkedAt: string
}
