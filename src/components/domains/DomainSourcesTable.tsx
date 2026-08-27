'use client'

import { DataTable } from '@/components/ui'
import type { DomainSourcesTableProps } from '@/types/domains'
import { useDomainSourcesRefresh } from '../../hooks/domains/useDomainSourcesRefresh'
import { getDomainSourcesColumns } from './domainSourcesColumns'

export default function DomainSourcesTable({
  sources,
}: Readonly<DomainSourcesTableProps>) {
  const { localHostnames, refreshingIps, handleRefresh } =
    useDomainSourcesRefresh()

  if (sources.length === 0) {
    return (
      <p className="text-zinc-500 dark:text-zinc-400">
        No source data for this domain.
      </p>
    )
  }

  const columns = getDomainSourcesColumns({
    localHostnames,
    refreshingIps,
    onRefresh: (sourceIp) => void handleRefresh(sourceIp),
  })

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <DataTable
        columns={columns}
        data={sources}
        initialSorting={[
          { id: 'count', desc: true },
          { id: 'sourceIp', desc: false },
        ]}
      />
    </div>
  )
}
