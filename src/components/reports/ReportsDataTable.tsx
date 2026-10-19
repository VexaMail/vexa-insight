'use client'

import { DataTable } from '@/components/ui'
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
    <div className={loading ? 'hidden opacity-50 xl:block' : 'hidden xl:block'}>
      <DataTable
        columns={columns}
        data={filtered}
        hideToolbar={true}
        hidePagination={true}
      />
    </div>
  )
}
