import type { StatusPillVariant, StatusTone } from '@/types/ui'

/**
 * The badge emphasis of a severity: solid when it asks for action (danger or
 * warning), soft when it only informs (low, info, pass).
 */
export function severityPillVariant(tone: StatusTone): StatusPillVariant {
  return tone === 'danger' || tone === 'warning' ? 'solid' : 'soft'
}
