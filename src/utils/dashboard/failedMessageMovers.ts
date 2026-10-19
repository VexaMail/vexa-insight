import { CHANGE_MOVER_MIN_MESSAGES } from '@/constants/dashboard'
import type { ChangeItem, DomainPeriodTotals } from '@/types/dashboard'
import { failedMessageMover } from './failedMessageMover'
import { failedOf } from './failedOf'

/** The three domains whose failed-message count moved the most, either way. */
export function failedMessageMovers(
  domains: DomainPeriodTotals[],
): ChangeItem[] {
  const delta = (d: DomainPeriodTotals) =>
    failedOf(d.current) - failedOf(d.previous)
  return domains
    .filter((d) => Math.abs(delta(d)) >= CHANGE_MOVER_MIN_MESSAGES)
    .sort((a, b) => Math.abs(delta(b)) - Math.abs(delta(a)))
    .slice(0, 3)
    .map(failedMessageMover)
}
