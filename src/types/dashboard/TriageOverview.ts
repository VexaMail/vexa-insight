import type { ChangeItem } from './ChangeItem'
import type { IngestionHealth } from './IngestionHealth'
import type { QueuedIssue } from './QueuedIssue'
import type { RankedRows } from './RankedRows'
import type { RankedTrends } from './RankedTrends'
import type { RateTrendPoint } from './RateTrendPoint'
import type { TriageKpis } from './TriageKpis'
import type { TriageWindow } from './TriageWindow'

/** All data of the home screen, computed on the server in one pass. */
export type TriageOverview = {
  window: TriageWindow
  kpis: TriageKpis
  /** Active issues only; acknowledged and snoozed ones live on /issues. */
  actions: QueuedIssue[]
  /** Derived issues an operator acknowledged or snoozed. */
  parkedIssues: number
  changes: ChangeItem[]
  trend: RateTrendPoint[]
  /** Window of the trend chart, e.g. "last 30 days". */
  trendLabel: string
  ingestion: IngestionHealth
  /** The tables' rows: lowest-compliance domains and top failing sources. */
  ranked: RankedRows
  /** Daily fail-rate of the lowest-compliance domains, failures per top IP. */
  rankedTrends: RankedTrends
}
