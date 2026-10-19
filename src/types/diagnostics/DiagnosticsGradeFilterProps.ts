import type { DiagnosticsGradeBand } from './DiagnosticsGradeBand'
import type { GradeBandCounts } from './GradeBandCounts'

/** The quick grade filter: the selected band and how many domains each holds. */
export type DiagnosticsGradeFilterProps = {
  readonly value: DiagnosticsGradeBand
  readonly counts: GradeBandCounts
  readonly onChange: (band: DiagnosticsGradeBand) => void
}
