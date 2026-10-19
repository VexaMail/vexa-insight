import type {
  DiagnosticsSectionId,
  DiagnosticsTabKey,
} from '@/types/diagnostics'

/** The tab each detail section lives in. */
export const diagnosticsSectionTabs: Record<
  DiagnosticsSectionId,
  DiagnosticsTabKey
> = {
  dns: 'dns',
  dmarc: 'auth',
  spf: 'auth',
  'spf-tree': 'auth',
  dkim: 'auth',
  'mta-sts': 'transport',
  'tls-rpt': 'transport',
  bimi: 'transport',
}
