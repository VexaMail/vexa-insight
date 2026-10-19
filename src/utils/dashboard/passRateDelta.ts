import type { TriageKpis } from '@/types/dashboard'
import { dmarcPassRate } from './dmarcPassRate'

/** Pass-rate change in points; null when either period has no messages. */
export function passRateDelta(kpis: TriageKpis): number | null {
  const current = dmarcPassRate(kpis.passCurrent)
  const previous = kpis.passPrevious ? dmarcPassRate(kpis.passPrevious) : null
  return current === null || previous === null ? null : current - previous
}
