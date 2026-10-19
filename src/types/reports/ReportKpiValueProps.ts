import type { ReportOutcomeLabel } from './ReportOutcomeLabel'

export type ReportKpiValueProps = {
  readonly value: string
  readonly verdict?: ReportOutcomeLabel | undefined
}
