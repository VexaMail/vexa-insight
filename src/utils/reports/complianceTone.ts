import type { StatusTone } from '@/types/ui'

/** Tone of a DMARC pass rate: 95% and up passes, 80% needs review. */
export function complianceTone(
  rate: number,
  totalMessages: number,
): StatusTone {
  if (totalMessages === 0) return 'unknown'
  if (rate >= 95) return 'success'
  if (rate >= 80) return 'warning'
  return 'danger'
}
