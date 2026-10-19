import type { ActionItem } from './ActionItem'
import type { ChangeItem } from './ChangeItem'
import type { DomainPeriodTotals } from './DomainPeriodTotals'
import type { FailingSourceSummary } from './FailingSourceSummary'
import type { IngestionHealth } from './IngestionHealth'
import type { RateTrendPoint } from './RateTrendPoint'
import type { TriageKpis } from './TriageKpis'
import type { TriageWindow } from './TriageWindow'

/** All data of the home screen, computed on the server in one pass. */
export type TriageOverview = {
  window: TriageWindow
  kpis: TriageKpis
  actions: ActionItem[]
  changes: ChangeItem[]
  trend: RateTrendPoint[]
  ingestion: IngestionHealth
  domains: DomainPeriodTotals[]
  failingSources: FailingSourceSummary[]
}
