import type { DomainInsights } from '@/types/domains'
import type { DomainSummary } from '@/types/reports'

export type InsightsTileProps = {
  readonly domainName: string
  readonly insights: DomainInsights
  readonly summary: DomainSummary
  readonly diagnosticsHref: string
}
