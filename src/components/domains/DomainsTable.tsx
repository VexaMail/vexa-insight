'use client'

import { DataTable, EmptyState } from '@/components/ui'
import { useListState } from '@/hooks/core'
import { useDomainsTable } from '@/hooks/domains'
import type { DomainsTableProps } from '@/types/domains'
import { getDomainsColumns } from './domainsColumns'
import { DomainsPhoneList } from './DomainsPhoneList'
import { DomainStatusSelect } from './DomainStatusSelect'

export default function DomainsTable({ domains }: Readonly<DomainsTableProps>) {
  const {
    filtered,
    statusFilter,
    handleRowClick,
    handleStatusChange,
    handleNavigate,
  } = useDomainsTable({ domains })
  const setScope = useListState((s) => s.setScope)
  const columns = getDomainsColumns({ setScope, filtered })

  if (domains.length === 0) {
    return (
      <EmptyState>
        No domains yet. Upload a DMARC report or configure IMAP to ingest
        reports.
      </EmptyState>
    )
  }

  return (
    <div className="space-y-4">
      <div className="md:hidden">
        <DomainStatusSelect
          value={statusFilter}
          onChange={handleStatusChange}
        />
      </div>
      <DomainsPhoneList rows={filtered} onNavigate={handleNavigate} />
      <div className="hidden md:block">
        <DataTable
          columns={columns}
          data={filtered}
          defaultPageSize={25}
          onRowClick={handleRowClick}
          toolbarActions={
            <DomainStatusSelect
              value={statusFilter}
              onChange={handleStatusChange}
            />
          }
        />
      </div>
    </div>
  )
}
