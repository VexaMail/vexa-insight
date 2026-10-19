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
  /** Emails the run before the latest one processed; null without one. */
  previousRunProcessed: number | null
  lastSuccessAtMs: number | null
  nextRunAtMs: number | null
  /**
   * Newest sign of mail arriving, unix ms: the last successful mailbox poll
   * or the newest stored report, whichever is later.
   */
  mailboxFreshAtMs: number | null
  /** How long the latest run took, in ms; null while running or unknown. */
  lastRunDurationMs: number | null
  /** Mailboxes configured for polling. */
  mailboxCount: number
  /** Errors across the runs of the last `RECENT_ERROR_DAYS` days. */
  recentErrorCount: number
  /** Newest UTC report day across the visible domains. */
  newestReportDay: number | null
}
