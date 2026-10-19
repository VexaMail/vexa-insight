import type { DomainPeriodTotals } from '@/types/dashboard'

export type DomainRankPanelProps = {
  readonly domains: DomainPeriodTotals[]
  /** Daily fail rate per domain id. */
  readonly trends: Readonly<Record<string, number[]>>
  readonly description: string
  readonly className?: string
}
