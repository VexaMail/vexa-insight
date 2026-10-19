import type { DiagnosticsTabKey } from '@/types/diagnostics'

export const diagnosticsTabOrder: readonly DiagnosticsTabKey[] = [
  'findings',
  'dns',
  'auth',
  'transport',
  'runbook',
  'generator',
]
