import type { ReactNode } from 'react'
import type { KpiGridCols } from './KpiGridCols'

export type KpiGridProps = {
  readonly children: ReactNode
  readonly cols?: KpiGridCols
  readonly className?: string
}
