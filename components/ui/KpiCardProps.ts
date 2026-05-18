import type { ReactNode } from 'react'
import type { KpiStatus } from './KpiStatus'

export type KpiCardProps = {
  readonly label: ReactNode
  readonly value: ReactNode
  readonly status?: KpiStatus
  readonly icon?: ReactNode
  readonly className?: string
}
