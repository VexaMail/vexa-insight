import type {
  DiagnosticsSectionToggleProps,
  DnsDiagnostics,
} from '@/types/diagnostics'

export type SpfDetailSectionProps = DiagnosticsSectionToggleProps & {
  dns: DnsDiagnostics
}
