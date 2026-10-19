'use client'

import { useDiagnosticsOverviewRows } from '@/hooks/diagnostics'
import { countGradeBands } from '@/utils/diagnostics'
import { DiagnosticsOverviewProgressLine } from './DiagnosticsOverviewProgressLine'
import { DiagnosticsOverviewSummary } from './DiagnosticsOverviewSummary'
import { DiagnosticsOverviewTable } from './DiagnosticsOverviewTable'
import type { DiagnosticsOverviewTableProps } from './DiagnosticsOverviewTableProps'

/**
 * The grade-band tiles above every domain's row. The stored runs show at
 * once; the stale ones are checked in the background and fill in as they
 * finish.
 */
export function DiagnosticsOverview({
  rows: initialRows,
}: Readonly<DiagnosticsOverviewTableProps>) {
  const { rows, progress } = useDiagnosticsOverviewRows(initialRows)
  return (
    <div className="space-y-4">
      <DiagnosticsOverviewSummary counts={countGradeBands(rows)} />
      <DiagnosticsOverviewProgressLine progress={progress} />
      <DiagnosticsOverviewTable rows={rows} />
    </div>
  )
}
