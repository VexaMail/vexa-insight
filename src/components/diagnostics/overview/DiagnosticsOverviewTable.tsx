'use client'

import { DataTable } from '@/components/ui'
import { useDiagnosticsOverviewTable } from '@/hooks/diagnostics'
import { DiagnosticsGradeFilter } from './DiagnosticsGradeFilter'
import { DiagnosticsOverviewCard } from './DiagnosticsOverviewCard'
import type { DiagnosticsOverviewTableProps } from './DiagnosticsOverviewTableProps'
import { diagnosticsOverviewColumns } from './diagnosticsOverviewColumns'

/**
 * Every domain's score and protocol states, lowest score first: searchable,
 * sortable, filtered by grade band, paged 25 at a time on desktop and 50
 * at a time on a phone.
 */
export function DiagnosticsOverviewTable({
  rows,
}: Readonly<DiagnosticsOverviewTableProps>) {
  const { band, counts, filtered, phoneRows, handleBandChange, showMore } =
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
      <div className="space-y-3 md:hidden">
        {filter}
        <ul className="glass-card divide-border divide-y">
          {phoneRows.map((row) => (
            <DiagnosticsOverviewCard key={row.domainId} row={row} />
          ))}
        </ul>
        {phoneRows.length < filtered.length ? (
          <button
            type="button"
            onClick={showMore}
            className="border-border bg-card text-foreground hover:bg-accent focus-visible:ring-ring min-h-10 w-full rounded-md border px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            Show more ({filtered.length - phoneRows.length} left)
          </button>
        ) : null}
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
