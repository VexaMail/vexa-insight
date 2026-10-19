import type { LastRunHealth } from '@/types/ingest'

/** What the Processing tile shows before any run has been recorded. */
export const EMPTY_LAST_RUN_HEALTH: LastRunHealth = {
  lastRunAt: null,
  lastRunSuccess: null,
  lastProcessed: 0,
  lastIngested: 0,
  lastErrorCount: 0,
  lastErrorSummary: null,
}
