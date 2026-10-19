import type { DomainPeriodTotals } from '@/types/dashboard'
import type { ReactNode } from 'react'

export type DomainRankPanelProps = {
  readonly title: string
  readonly description: string
  readonly icon: ReactNode
  readonly domains: DomainPeriodTotals[]
  readonly emptyText: string
  readonly className?: string
}
