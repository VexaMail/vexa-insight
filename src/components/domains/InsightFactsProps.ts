import type { DomainInsights } from '@/types/domains'
import type { DomainSummary } from '@/types/reports'

export type InsightFactsProps = {
  readonly domainName: string
  readonly insights: DomainInsights
  readonly summary: DomainSummary
}
