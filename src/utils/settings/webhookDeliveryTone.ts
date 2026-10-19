import type { StatusTone } from '@/types/ui'

/** Tone of an endpoint's last delivery: 2xx passes, anything else fails. */
export function webhookDeliveryTone(lastStatus: string | null): StatusTone {
  if (lastStatus === null) return 'unknown'
  const code = Number(lastStatus)
  return code >= 200 && code < 300 ? 'success' : 'danger'
}
