import type {
  DiagnosticsFinding,
  DiagnosticsLinkBase,
} from '@/types/diagnostics'

export type ProtocolStatusTilesProps = {
  readonly findings: readonly DiagnosticsFinding[]
  readonly base: DiagnosticsLinkBase
}
