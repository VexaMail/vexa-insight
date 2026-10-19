import { countGradeBands } from '@/utils/diagnostics'
import { DiagnosticsOverviewSummary } from './DiagnosticsOverviewSummary'
import { DiagnosticsOverviewTable } from './DiagnosticsOverviewTable'
import type { DiagnosticsOverviewTableProps } from './DiagnosticsOverviewTableProps'

/** The grade-band tiles above every domain's row. */
export function DiagnosticsOverview({
  rows,
}: Readonly<DiagnosticsOverviewTableProps>) {
  return (
    <div className="space-y-4">
      <DiagnosticsOverviewSummary counts={countGradeBands(rows)} />
      <DiagnosticsOverviewTable rows={rows} />
    </div>
  )
}
