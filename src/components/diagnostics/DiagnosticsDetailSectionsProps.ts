import type {
  DnsDiagnostics,
  UseDiagnosticsSectionsReturn,
} from '@/types/diagnostics'

export type DiagnosticsDetailSectionsProps = {
  dns: DnsDiagnostics
  getSectionProps: UseDiagnosticsSectionsReturn['getSectionProps']
}
