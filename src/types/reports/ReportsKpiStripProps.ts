import type { ReportsWindowSummary } from './ReportsWindowSummary'

export type ReportsKpiStripProps = {
  readonly summary: ReportsWindowSummary
  /** The window the figures cover, e.g. "last 30 days". */
  readonly windowLabel: string
}
