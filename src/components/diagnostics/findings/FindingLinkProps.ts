import type {
  DiagnosticsFinding,
  DiagnosticsLinkBase,
} from '@/types/diagnostics'

export type FindingLinkProps = {
  readonly finding: DiagnosticsFinding
  readonly base: DiagnosticsLinkBase
}
