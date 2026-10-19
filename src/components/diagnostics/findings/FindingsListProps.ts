import type {
  DiagnosticsFinding,
  DiagnosticsLinkBase,
} from '@/types/diagnostics'

export type FindingsListProps = {
  readonly findings: readonly DiagnosticsFinding[]
  readonly base: DiagnosticsLinkBase
}
