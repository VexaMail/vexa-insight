import type { DiagnosticsSectionId, DnsDiagnostics } from '@/types/diagnostics'

export type ProtocolOverviewPanelProps = {
  dns: DnsDiagnostics
  onOpenSection: (id: DiagnosticsSectionId) => void
}
