import type { DiagnosticsFindingSeverity } from '@/types/diagnostics'

/** Sort key of each severity, most urgent first. */
export const findingSeverityRanks: Record<DiagnosticsFindingSeverity, number> =
  { critical: 0, high: 1, medium: 2, low: 3, info: 4, pass: 5 }
