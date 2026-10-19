import type { StatusTone } from '@/types/ui'

/** Tone of a pass rate on the console's bands; unknown without messages. */
export function passRateTone(rate: number | null): StatusTone {
  if (rate === null) return 'unknown'
  if (rate >= 95) return 'success'
  if (rate >= 80) return 'warning'
  return 'danger'
}
