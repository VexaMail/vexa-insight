import type {
  DiagnosticsSectionToggleProps,
  DnsDiagnostics,
} from '@/types/diagnostics'

export type SpfLookupTreeSectionProps = DiagnosticsSectionToggleProps & {
  dns: DnsDiagnostics
}
