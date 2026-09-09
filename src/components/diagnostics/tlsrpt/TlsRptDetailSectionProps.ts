import type {
  DiagnosticsSectionToggleProps,
  DnsDiagnostics,
} from '@/types/diagnostics'

export type TlsRptDetailSectionProps = DiagnosticsSectionToggleProps & {
  dns: DnsDiagnostics
}
