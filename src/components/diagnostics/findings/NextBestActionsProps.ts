import type {
  DiagnosticsAdminGuide,
  DiagnosticsLinkBase,
} from '@/types/diagnostics'

export type NextBestActionsProps = {
  readonly guides: readonly DiagnosticsAdminGuide[]
  readonly base: DiagnosticsLinkBase
}
