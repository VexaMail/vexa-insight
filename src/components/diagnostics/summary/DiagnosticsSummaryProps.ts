import type {
  DiagnosticsFinding,
  DiagnosticsLinkBase,
  DomainScore,
} from '@/types/diagnostics'

export type DiagnosticsSummaryProps = {
  readonly score: DomainScore
  readonly findings: readonly DiagnosticsFinding[]
  readonly base: DiagnosticsLinkBase
  /** Findings that ask for a change. */
  readonly actionable: number
}
