import type { DiagnosticsTabKey } from '@/types/diagnostics'

export const diagnosticsTabLabels: Record<DiagnosticsTabKey, string> = {
  findings: 'Findings',
  dns: 'DNS Records',
  auth: 'Authentication Flow',
  transport: 'TLS / Reporting',
  runbook: 'Runbook',
  generator: 'Record generator',
}
