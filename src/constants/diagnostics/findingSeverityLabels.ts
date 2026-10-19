import type { DiagnosticsFindingSeverity } from '@/types/diagnostics'

export const findingSeverityLabels: Record<DiagnosticsFindingSeverity, string> =
  {
    critical: 'Critical',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    info: 'Info',
    pass: 'Pass',
  }
