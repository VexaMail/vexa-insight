import type { CountComparison } from './CountComparison'
import type { PeriodTotals } from './PeriodTotals'

/** The four headline figures with what each one is out of. */
export type TriageKpis = {
  messages: CountComparison
  reports: CountComparison
  monitoredDomains: number
  reportingDomains: number
  addedDomains: number
  passCurrent: PeriodTotals
  passPrevious: PeriodTotals | null
}
