import type { AggregateStats } from './AggregateStats'
import type { DomainSummary } from './DomainSummary'
/**
 * Domains summary: all domain summaries plus overall stats.
 */
export type DomainsSummaryResponse = {
  domains: DomainSummary[]
  overall: AggregateStats
}
