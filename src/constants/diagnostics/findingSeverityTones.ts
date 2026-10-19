import type { DiagnosticsFindingSeverity } from '@/types/diagnostics'
import type { StatusTone } from '@/types/ui'

/** Status colour of each severity; critical and high are both failures. */
export const findingSeverityTones: Record<
  DiagnosticsFindingSeverity,
  StatusTone
> = {
  critical: 'danger',
  high: 'danger',
  medium: 'warning',
  low: 'info',
  info: 'neutral',
  pass: 'success',
}
