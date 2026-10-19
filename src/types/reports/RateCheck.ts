import type { StatusTone } from '@/types/ui'
import type { ReportOutcomeLabel } from './ReportOutcomeLabel'

/** The figure, pill and accent of one alignment-rate tile. */
export type RateCheck = {
  readonly value: string
  readonly verdict: ReportOutcomeLabel | undefined
  readonly accent: StatusTone
}
