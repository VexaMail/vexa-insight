import type { DomainInsights } from '@/types/domains'
import type { DomainSummary } from '@/types/reports'

export type InsightFactsProps = {
  readonly insights: DomainInsights
  readonly summary: DomainSummary
}
