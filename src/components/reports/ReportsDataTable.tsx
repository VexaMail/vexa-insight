'use client'

import { DataTable } from '@/components/ui'
import { useListState } from '@/hooks/core'
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
  onRowClick,
}: Readonly<ReportsDataTableProps>) {
  const setScope = useListState((s) => s.setScope)

  const columns = getReportsColumns({
    dispatch,
    sortKey,
    sortDir,
    filtered,
    domainName,
    setScope,
  })

  return (
    <div className={loading ? 'opacity-50' : ''}>
      <DataTable
        columns={columns}
        data={filtered}
        hideToolbar={true}
        hidePagination={true}
        onRowClick={onRowClick}
      />
    </div>
  )
}
