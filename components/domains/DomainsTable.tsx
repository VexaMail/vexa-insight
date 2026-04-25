'use client'

import { DataTable } from '@/components/ui'
import { useListState } from '@/hooks/core'
import { useDomainsTable } from '@/hooks/domains'
import type { DomainsTableProps } from '@/types/domains'
import { Filter } from 'lucide-react'
import { getDomainsColumns } from './domainsColumns'

export default function DomainsTable({ domains }: Readonly<DomainsTableProps>) {
  const { filtered, statusFilter, handleRowClick, handleStatusSelectChange } =
    useDomainsTable({ domains })
  const setScope = useListState((s) => s.setScope)
  const columns = getDomainsColumns({ setScope, filtered })

  if (domains.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-muted-foreground">
          No domains yet. Upload a DMARC report or configure IMAP to ingest
          reports.
        </p>
      </div>
    )
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-4 duration-500">
      <DataTable
        columns={columns}
        data={filtered}
        defaultPageSize={25}
        onRowClick={handleRowClick}
        toolbarActions={
          <div className="flex items-center gap-2">
            <Filter className="text-muted-foreground h-4 w-4" />
            <select
              value={statusFilter}
              onChange={handleStatusSelectChange}
              className="bg-background border-input focus-visible:ring-primary text-foreground h-9 rounded-md border px-3 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
              aria-label="Filter domains by status"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Warning">Warning</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        }
      />
    </div>
  )
}
