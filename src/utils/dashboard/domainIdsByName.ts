import type { DomainPeriodTotals } from '@/types/dashboard'

/** The ids of the named domains, for filtering daily rollup rows. */
export function domainIdsByName(
  domains: readonly DomainPeriodTotals[],
  names: readonly string[],
): Set<number> {
  const wanted = new Set(names)
  return new Set(
    domains.filter((d) => wanted.has(d.domainName)).map((d) => d.domainId),
  )
}
