import type { DomainPeriodTotals } from './DomainPeriodTotals'
import type { FailingSourceSummary } from './FailingSourceSummary'

/** The rows the overview's ranked tables show. */
export type RankedRows = {
  domains: DomainPeriodTotals[]
  sources: FailingSourceSummary[]
}
