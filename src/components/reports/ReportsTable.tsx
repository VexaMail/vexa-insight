'use client'

import { DataTable, Input, UnifiedPagination } from '@/components/ui'
import { useListState } from '@/hooks/core'
import type { ReportRow } from '@/types/reports'
import { m as motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useReportsTable } from '../../hooks/reports/useReportsTable'
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
  } = useReportsTable({
    domainId: domainId,
  })

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

  if (loading && data == null) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="animate-pulse space-y-3">
          <div className="bg-muted mx-auto h-4 w-1/3 rounded" />
          <div className="bg-muted mx-auto h-4 w-1/2 rounded" />
        </div>
        <p className="text-muted-foreground mt-4 text-sm">Loading reports…</p>
      </div>
    )
  }

  if (data == null || data.items.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-muted-foreground">
          No reports yet. Upload a DMARC file or configure IMAP to ingest
          reports.
        </p>
      </div>
    )
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-5 duration-500">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search by report ID or organization..."
            value={search}
            onChange={(e) =>
              dispatch({ type: 'SET_SEARCH', payload: e.target.value })
            }
            className="bg-card border-border/50 pl-9"
          />
        </div>
        <select
          value={filterOrg}
          onChange={(e) => {
            dispatch({ type: 'SET_FILTER_ORG', payload: e.target.value })
            updateUrlParams('org', e.target.value)
          }}
          className="bg-background border-input focus-visible:ring-primary text-foreground h-9 rounded-md border px-3 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
        >
          <option value="">All Organizations</option>
          {orgOptions.map((org: string) => (
            <option key={org} value={org}>
              {org}
            </option>
          ))}
        </select>
        {!domainId && (
          <select
            value={filterDomain}
            onChange={(e) => {
              dispatch({ type: 'SET_FILTER_DOMAIN', payload: e.target.value })
              updateUrlParams('domain', e.target.value)
            }}
            className="bg-background border-input focus-visible:ring-primary text-foreground h-9 rounded-md border px-3 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
          >
            <option value="">All Domains</option>
            {domainOptions.map((d: string) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        )}
      </motion.div>

      <div className={loading ? 'opacity-50' : ''}>
        <DataTable
          columns={columns}
          data={filtered}
          hideToolbar={true}
          hidePagination={true}
          onRowClick={(row) => {
            setScope(filtered.map((r: ReportRow) => r.id.toString()))
            router.push(`/reports/${row.original.id}`)
          }}
        />
      </div>

      <UnifiedPagination
        page={data.page}
        pageSize={data.pageSize}
        total={data.total}
        onPageChange={(p) => dispatch({ type: 'SET_PAGE', payload: p })}
        onPageSizeChange={(s) =>
          dispatch({ type: 'SET_PAGE_SIZE', payload: s })
        }
      />
    </div>
  )
}
