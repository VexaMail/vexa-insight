import type {
  DiagnosticsSectionToggleProps,
  DnsDiagnostics,
} from '@/types/diagnostics'

export type MtaStsDetailSectionProps = DiagnosticsSectionToggleProps & {
  dns: DnsDiagnostics
}
