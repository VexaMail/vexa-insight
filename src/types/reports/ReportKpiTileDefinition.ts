import type { SparklineKind, StatusTone } from '@/types/ui'
import type { ReportKpiTileId } from './ReportKpiTileId'
import type { ReportOutcomeLabel } from './ReportOutcomeLabel'

/** One figure of a report KPI strip, with what it is out of. */
export type ReportKpiTileDefinition = {
  readonly id: ReportKpiTileId
  readonly label: string
  readonly value: string
  readonly hint: string
  readonly tone: StatusTone
  /** Tone of the icon square and sparkline when it differs from the value. */
  readonly accent?: StatusTone
  readonly trend: readonly number[]
  readonly trendKind?: SparklineKind
  /** A pass or fail pill after the figure. */
  readonly verdict?: ReportOutcomeLabel | undefined
}
