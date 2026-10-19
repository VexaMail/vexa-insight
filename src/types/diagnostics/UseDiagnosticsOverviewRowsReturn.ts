import type { DiagnosticsOverviewProgress } from './DiagnosticsOverviewProgress'
import type { DiagnosticsOverviewRow } from './DiagnosticsOverviewRow'

/** The index rows as they fill in, and how far the refresh has got. */
export type UseDiagnosticsOverviewRowsReturn = {
  readonly rows: readonly DiagnosticsOverviewRow[]
  readonly progress: DiagnosticsOverviewProgress
}
