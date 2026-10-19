import type { ComplianceTrend } from '@/types/domains'
import type { DomainSummary } from '@/types/reports'

export type ComplianceTileProps = {
  readonly summary: DomainSummary
  readonly trend: ComplianceTrend
}
