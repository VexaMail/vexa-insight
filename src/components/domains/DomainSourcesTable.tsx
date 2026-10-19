'use client'

import { DataTable, EmptyState } from '@/components/ui'
import { useDomainSourcesTable } from '@/hooks/domains'
import type { DomainSourcesTableProps } from '@/types/domains'
import { getDomainSourcesColumns } from './domainSourcesColumns'
import { SourcesPhoneList } from './SourcesPhoneList'
import { SourcesToolbar } from './SourcesToolbar'

export default function DomainSourcesTable({
  sources,
  csvHref,
  days,
}: Readonly<DomainSourcesTableProps>) {
  const state = useDomainSourcesTable(sources)

  if (sources.length === 0) {
    return (
      <EmptyState>No source data for this domain in this window.</EmptyState>
    )
  }

  const columns = getDomainSourcesColumns({
    localHostnames: state.localHostnames,
    refreshingIps: state.refreshingIps,
    onRefresh: (sourceIp) => void state.handleRefresh(sourceIp),
  })
  const toolbar = (
    <SourcesToolbar
      classFilter={state.classFilter}
      country={state.country}
      days={days}
      countryOptions={state.countryOptions}
      csvHref={csvHref}
      onClassChange={state.setClass}
      onCountryChange={state.setCountry}
      onDaysChange={state.setDays}
    />
  )

  return (
    <>
      <div className="space-y-3 md:hidden">
        {toolbar}
        <SourcesPhoneList rows={state.rows} />
      </div>
      <div className="hidden md:block">
        <DataTable
          columns={columns}
          data={state.rows}
          defaultPageSize={25}
          initialSorting={[
            { id: 'count', desc: true },
            { id: 'sourceIp', desc: false },
          ]}
          toolbarActions={toolbar}
        />
      </div>
    </>
  )
}
