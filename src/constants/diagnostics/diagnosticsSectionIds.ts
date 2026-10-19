import type { DiagnosticsSectionId } from '@/types/diagnostics'

export const diagnosticsSectionIds: readonly DiagnosticsSectionId[] = [
  'dns',
  'dmarc',
  'spf',
  'spf-tree',
  'dkim',
  'mta-sts',
  'tls-rpt',
  'bimi',
]
