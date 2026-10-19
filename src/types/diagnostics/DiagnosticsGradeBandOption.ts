import type { StatusTone } from '@/types/ui'
import type { DiagnosticsGradeBand } from './DiagnosticsGradeBand'
import type { GradeBandCounts } from './GradeBandCounts'

/** One button of the grade quick filter: its band, label, dot tone and count field. */
export type DiagnosticsGradeBandOption = {
  readonly value: DiagnosticsGradeBand
  readonly label: string
  readonly tone: StatusTone
  readonly countKey: keyof GradeBandCounts
}
