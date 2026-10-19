import type { DiagnosticsFinding } from './DiagnosticsFinding'
import type { DomainScore } from './DomainScore'

/** One domain of the diagnostics index: its score and protocol states. */
export type DiagnosticsOverviewRow = {
  readonly domainName: string
  readonly score: DomainScore
  readonly findings: readonly DiagnosticsFinding[]
  /** ISO timestamp of the DNS run the row was computed from. */
  readonly checkedAt: string
  /** False when the NS lookup returned nothing: the run says little. */
  readonly resolved: boolean
}
