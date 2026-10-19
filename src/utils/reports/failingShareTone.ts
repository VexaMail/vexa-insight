import type { StatusTone } from '@/types/ui'

/** Tone of the share of messages failing DMARC: under 5% passes review. */
export function failingShareTone(share: number, messages: number): StatusTone {
  if (messages === 0) return 'unknown'
  if (share < 5) return 'success'
  if (share < 20) return 'warning'
  return 'danger'
}
