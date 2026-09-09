import type {
  DiagnosticsSectionToggleProps,
  DnsDiagnostics,
} from '@/types/diagnostics'

export type DkimDetailSectionProps = DiagnosticsSectionToggleProps & {
  dns: DnsDiagnostics
}
