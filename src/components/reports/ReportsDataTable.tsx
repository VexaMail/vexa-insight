'use client'

import { DataTable } from '@/components/ui'
import { cn } from '@/lib/utils'
import { getReportsColumns } from './reportsColumns'
import type { ReportsDataTableProps } from './ReportsDataTableProps'

/** The reports grid with its sortable columns; dimmed while reloading. */
export function ReportsDataTable({
  dispatch,
  sortKey,
  sortDir,
  filtered,
  domainName,
  loading,
}: Readonly<ReportsDataTableProps>) {
  const columns = getReportsColumns({
    dispatch,
    sortKey,
    sortDir,
    filtered,
    domainName,
  })

  return (
    <div
      className={cn(
        '[&_thead_tr]:bg-secondary/50 hidden xl:block [&_.glass-card]:bg-transparent [&_.glass-card]:shadow-none',
        loading && 'opacity-50',
      )}
    >
      <DataTable
        columns={columns}
        data={filtered}
        hideToolbar={true}
        hidePagination={true}
      />
    </div>
  )
}
