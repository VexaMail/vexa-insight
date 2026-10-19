import { TRIAGE_MIN_VOLUME } from '@/constants/dashboard'
import type { DomainPeriodTotals } from '@/types/dashboard'
import { dmarcPassRate } from './dmarcPassRate'

/** Lowest pass rates among domains with enough messages to judge. */
export function lowestComplianceDomains(
  domains: DomainPeriodTotals[],
  limit: number,
): DomainPeriodTotals[] {
  const rate = (d: DomainPeriodTotals) => dmarcPassRate(d.current) ?? 0
  return domains
    .filter((d) => d.current.total >= TRIAGE_MIN_VOLUME)
    .sort((a, b) => rate(a) - rate(b) || b.current.total - a.current.total)
    .slice(0, limit)
}
