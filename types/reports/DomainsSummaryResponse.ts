import type { AggregateStats, DomainSummary } from '@/types/reports'

/**
 * Domains summary: all domain summaries plus overall stats.
 */
export type DomainsSummaryResponse = {
  domains: DomainSummary[]
  overall: AggregateStats
}
