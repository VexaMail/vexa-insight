import type { DomainPeriodTotals } from '@/types/dashboard'
import type { ReactNode } from 'react'

export type DomainRankPanelProps = {
  readonly title: string
  readonly description: string
  readonly icon: ReactNode
  readonly domains: DomainPeriodTotals[]
  readonly emptyText: string
  /** Header of the rate column, e.g. "Pass rate" or "Compliance". */
  readonly rateLabel: string
  readonly className?: string
}
