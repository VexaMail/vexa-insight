import type { DomainPeriodTotals } from '@/types/dashboard'

/** The domains with the most reported messages in the current period. */
export function topDomainsByVolume(
  domains: DomainPeriodTotals[],
  limit: number,
): DomainPeriodTotals[] {
  return domains
    .filter((d) => d.current.total > 0)
    .sort((a, b) => b.current.total - a.current.total)
    .slice(0, limit)
}
