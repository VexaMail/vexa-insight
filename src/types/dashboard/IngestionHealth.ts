import type { IngestionState } from './IngestionState'

/** Everything the overview's ingestion panel shows, from existing tables. */
export type IngestionHealth = {
  state: IngestionState
  /** Scheduled interval in minutes; null when the scheduler does not run. */
  intervalMinutes: number | null
  lastRunAtMs: number | null
  lastRunSuccess: boolean | null
  lastRunProcessed: number
  lastRunIngested: number
  lastRunError: string | null
  lastSuccessAtMs: number | null
  nextRunAtMs: number | null
  /** Newest UTC report day across the visible domains. */
  newestReportDay: number | null
}
