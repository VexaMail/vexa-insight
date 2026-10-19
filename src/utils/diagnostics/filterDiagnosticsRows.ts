import type {
  DiagnosticsGradeBand,
  DiagnosticsOverviewRow,
} from '@/types/diagnostics'
import { diagnosticsGradeBandOf } from './diagnosticsGradeBandOf'

/** The rows of one grade band, or every row for `all`. */
export function filterDiagnosticsRows(
  rows: readonly DiagnosticsOverviewRow[],
  band: DiagnosticsGradeBand,
): DiagnosticsOverviewRow[] {
  if (band === 'all') return [...rows]
  return rows.filter((row) => diagnosticsGradeBandOf(row) === band)
}
