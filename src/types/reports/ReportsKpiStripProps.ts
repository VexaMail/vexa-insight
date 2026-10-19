import type { ReportsWindowSummary } from './ReportsWindowSummary'
import type { ReportsWindowTrends } from './ReportsWindowTrends'

export type ReportsKpiStripProps = {
  readonly summary: ReportsWindowSummary
  readonly trends: ReportsWindowTrends
  /** The window the figures cover, e.g. "last 30 days". */
  readonly windowLabel: string
}
