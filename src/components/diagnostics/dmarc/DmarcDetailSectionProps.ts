import type {
  DiagnosticsSectionToggleProps,
  DnsDiagnostics,
} from '@/types/diagnostics'

export type DmarcDetailSectionProps = DiagnosticsSectionToggleProps & {
  dns: DnsDiagnostics
}
