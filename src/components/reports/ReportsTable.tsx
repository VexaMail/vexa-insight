'use client'

import { useReportsTable } from '../../hooks/reports/useReportsTable'
import { ReportsCardList } from './ReportsCardList'
import { ReportsDataTable } from './ReportsDataTable'
import { ReportsTableEmpty } from './ReportsTableEmpty'
import { ReportsTableLoading } from './ReportsTableLoading'
import { ReportsTablePagination } from './ReportsTablePagination'
import type { ReportsTableProps } from './ReportsTableProps'
import { ReportsTableToolbar } from './ReportsTableToolbar'

export default function ReportsTable({
  domainId,
  domainName,
}: ReportsTableProps = {}) {
  const {
    state,
    dispatch,
    orgOptions,
    domainOptions,
    filtered,
    updateUrlParams,
  } = useReportsTable({ domainId: domainId })

  const { data, loading, search, filterOrg, filterDomain, sortKey, sortDir } =
    state

  if (loading && data == null) return <ReportsTableLoading />
  if (data == null || data.items.length === 0) return <ReportsTableEmpty />

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-4 duration-500">
      <ReportsTableToolbar
        search={search}
        filterOrg={filterOrg}
        filterDomain={filterDomain}
        orgOptions={orgOptions}
        domainOptions={domainOptions}
        showDomainFilter={!domainId}
        dispatch={dispatch}
        updateUrlParams={updateUrlParams}
      />

      <ReportsDataTable
        dispatch={dispatch}
        sortKey={sortKey}
        sortDir={sortDir}
        filtered={filtered}
        domainName={domainName}
        loading={loading}
      />

      <ReportsCardList rows={filtered} domainName={domainName} />

      <ReportsTablePagination data={data} dispatch={dispatch} />
    </div>
  )
}
