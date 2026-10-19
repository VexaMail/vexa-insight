import type { DiagnosticsTabKey } from '@/types/diagnostics'

export const diagnosticsTabLabels: Record<DiagnosticsTabKey, string> = {
  findings: 'Findings',
  dns: 'DNS records',
  auth: 'Authentication flow',
  transport: 'TLS & reporting',
  runbook: 'Runbook',
}
