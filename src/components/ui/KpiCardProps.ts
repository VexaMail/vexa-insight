import type { MetricStatus } from '@/types/metrics'
import type { ReactNode } from 'react'

export type KpiCardProps = {
  readonly label: ReactNode
  readonly value: ReactNode
  readonly status?: MetricStatus
  readonly icon?: ReactNode
  readonly className?: string
}
