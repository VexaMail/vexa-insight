import type { ComplianceTrend } from '@/types/domains'
import type { DomainSummary } from '@/types/reports'

export type ComplianceTileProps = {
  readonly summary: DomainSummary
  readonly trend: ComplianceTrend
  /** Messages per UTC day over the last 30 days, oldest first. */
  readonly dailyVolume: readonly number[]
  readonly historyHref: string
}
