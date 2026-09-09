import type {
  DiagnosticsSectionToggleProps,
  DnsDiagnostics,
} from '@/types/diagnostics'

export type DnsRecordsSectionProps = DiagnosticsSectionToggleProps & {
  dns: DnsDiagnostics
}
