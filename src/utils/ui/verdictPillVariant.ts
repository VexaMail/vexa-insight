import type { StatusPillVariant, StatusTone } from '@/types/ui'

/**
 * The badge emphasis of a check's verdict: solid for a pass, a failure or a
 * partial result, soft when there was not enough data to judge.
 */
export function verdictPillVariant(tone: StatusTone): StatusPillVariant {
  return tone === 'unknown' || tone === 'neutral' ? 'soft' : 'solid'
}
