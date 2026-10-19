'use client'

import { DataTable } from '@/components/ui'
import { useDiagnosticsOverviewTable } from '@/hooks/diagnostics'
import { DiagnosticsGradeFilter } from './DiagnosticsGradeFilter'
import { DiagnosticsOverviewCard } from './DiagnosticsOverviewCard'
import type { DiagnosticsOverviewTableProps } from './DiagnosticsOverviewTableProps'
import { diagnosticsOverviewColumns } from './diagnosticsOverviewColumns'

/**
 * Every domain's score and protocol states, lowest score first: searchable,
 * sortable, filtered by grade band and paged 25 at a time on desktop.
 */
export function DiagnosticsOverviewTable({
  rows,
}: Readonly<DiagnosticsOverviewTableProps>) {
  const { band, counts, filtered, handleBandChange } =
    useDiagnosticsOverviewTable(rows)
  const filter = (
    <DiagnosticsGradeFilter
      value={band}
      counts={counts}
      onChange={handleBandChange}
    />
  )
  return (
    <section aria-label="Domains" className="space-y-3">
      <p className="text-muted-foreground text-xs">
        Each run is reused for up to 5 minutes; open a domain for a live run.
      </p>
      <div className="space-y-3 md:hidden">
        {filter}
        <ul className="glass-card divide-border divide-y">
          {filtered.map((row) => (
            <DiagnosticsOverviewCard key={row.domainName} row={row} />
          ))}
        </ul>
      </div>
      <div className="hidden md:block">
        <DataTable
          columns={diagnosticsOverviewColumns}
          data={filtered}
          defaultPageSize={25}
          initialSorting={[{ id: 'score', desc: false }]}
          toolbarActions={filter}
        />
      </div>
    </section>
  )
}
