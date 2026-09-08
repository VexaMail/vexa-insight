'use client'

import { DataTable, UnifiedPagination } from '@/components/ui'
import { useListState } from '@/hooks/core'
import type { ReportRow } from '@/types/reports'
import { useRouter } from 'next/navigation'
import { useReportsTable } from '../../hooks/reports/useReportsTable'
import { ReportsTableEmpty } from './ReportsTableEmpty'
import { ReportsTableLoading } from './ReportsTableLoading'
import { ReportsTableToolbar } from './ReportsTableToolbar'
import { getReportsColumns } from './reportsColumns'

export default function ReportsTable({
  domainId,
  domainName,
}: {
  readonly domainId?: number
  readonly domainName?: string
} = {}) {
  const router = useRouter()
  const setScope = useListState((s) => s.setScope)

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

  const columns = getReportsColumns({
    dispatch,
    sortKey,
    sortDir,
    filtered,
    domainName,
    setScope,
  })

  if (loading && data == null) return <ReportsTableLoading />
  if (data == null || data.items.length === 0) return <ReportsTableEmpty />

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-5 duration-500">
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

      <div className={loading ? 'opacity-50' : ''}>
        <DataTable
          columns={columns}
          data={filtered}
          hideToolbar={true}
          hidePagination={true}
          onRowClick={(row) => {
            setScope(filtered.map((r: ReportRow) => r.id.toString()))
            router.push(`/reports/${String(row.original.id)}`)
          }}
        />
      </div>

      <UnifiedPagination
        page={data.page}
        pageSize={data.pageSize}
        total={data.total}
        onPageChange={(p) => {
          dispatch({ type: 'SET_PAGE', payload: p })
        }}
        onPageSizeChange={(s) => {
          dispatch({ type: 'SET_PAGE_SIZE', payload: s })
        }}
      />
    </div>
  )
}
