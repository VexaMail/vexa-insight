import type {
  CountComparison,
  DomainPeriodTotals,
  TriageKpis,
  TriageWindow,
} from '@/types/dashboard'
import { isAddedInRange } from './isAddedInRange'
import { sumPeriodTotals } from './sumPeriodTotals'

/** The KPI strip, every figure from the same per-domain rollup rows. */
export function buildTriageKpis(
  domains: DomainPeriodTotals[],
  reports: CountComparison,
  window: TriageWindow,
): TriageKpis {
  const passCurrent = sumPeriodTotals(domains.map((d) => d.current))
  const passPrevious = window.previous
    ? sumPeriodTotals(domains.map((d) => d.previous))
    : null
  return {
    messages: {
      current: passCurrent.total,
      previous: passPrevious?.total ?? null,
    },
    reports,
    monitoredDomains: domains.length,
    reportingDomains: domains.filter((d) => d.current.total > 0).length,
    addedDomains: domains.filter((d) => isAddedInRange(d, window.current))
      .length,
    passCurrent,
    passPrevious,
  }
}
