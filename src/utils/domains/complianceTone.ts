import type { StatusTone } from '@/types/ui'

/** Tone of a pass rate in percent; no rate reads as not enough data. */
export function complianceTone(rate: number | null): StatusTone {
  if (rate === null) return 'unknown'
  if (rate >= 95) return 'success'
  return rate >= 80 ? 'warning' : 'danger'
}
