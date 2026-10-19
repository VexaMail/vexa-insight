import type { DomainPeriodTotals } from './DomainPeriodTotals'
import type { IngestionHealth } from './IngestionHealth'
import type { SourcePeriodRow } from './SourcePeriodRow'
import type { TriageWindow } from './TriageWindow'

/** What the action-queue and change-list rules read. */
export type TriageRuleInput = {
  window: TriageWindow
  domains: DomainPeriodTotals[]
  sources: SourcePeriodRow[]
  ingestion: IngestionHealth
  todayDay: number
}
