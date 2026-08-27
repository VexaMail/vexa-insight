import { cn } from '@/lib/utils'
import { KPI_GRID_COLS_CLASS } from './kpiGridColsClass'
import type { KpiGridProps } from './KpiGridProps'

export function KpiGrid({
  children,
  cols = 5,
  className,
}: Readonly<KpiGridProps>) {
  return (
    <div className={cn('grid gap-3', KPI_GRID_COLS_CLASS[cols], className)}>
      {children}
    </div>
  )
}
