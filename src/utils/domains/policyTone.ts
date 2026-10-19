import type { StatusTone } from '@/types/ui'

/** Tone of a published policy: enforcing is success, monitoring needs work. */
export function policyTone(policy: string | null): StatusTone {
  if (policy === 'reject') return 'success'
  if (policy === 'quarantine') return 'info'
  if (policy === 'none') return 'warning'
  return 'unknown'
}
