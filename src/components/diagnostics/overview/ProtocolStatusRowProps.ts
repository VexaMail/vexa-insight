import type { DiagnosticsSectionId } from '@/types/diagnostics'

export type ProtocolStatusRowProps = {
  protocol: string
  status: 'valid' | 'invalid' | 'not-found'
  detail?: string | undefined
  sectionId: DiagnosticsSectionId
  onOpenDetails: (id: DiagnosticsSectionId) => void
}
