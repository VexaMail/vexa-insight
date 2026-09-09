import type {
  DiagnosticsSectionToggleProps,
  DnsDiagnostics,
} from '@/types/diagnostics'

export type BimiDetailSectionProps = DiagnosticsSectionToggleProps & {
  dns: DnsDiagnostics
}
