import type { DiagnosticsGradeBand } from './DiagnosticsGradeBand'
import type { DiagnosticsOverviewRow } from './DiagnosticsOverviewRow'
import type { GradeBandCounts } from './GradeBandCounts'

/** The selected grade band, the count behind each band, and the rows shown. */
export type UseDiagnosticsOverviewTableReturn = {
  readonly band: DiagnosticsGradeBand
  readonly counts: GradeBandCounts
  readonly filtered: DiagnosticsOverviewRow[]
  readonly handleBandChange: (band: DiagnosticsGradeBand) => void
}
