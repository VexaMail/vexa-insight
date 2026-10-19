import type { StatusTone } from '@/types/ui'

/** Tone of what the receiver did: delivered, quarantined or rejected. */
export function dispositionTone(disposition: string): StatusTone {
  if (disposition === 'reject') return 'danger'
  if (disposition === 'quarantine') return 'warning'
  return 'neutral'
}
