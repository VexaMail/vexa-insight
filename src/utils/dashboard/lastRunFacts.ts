import type { LastRunFacts } from '@/types/dashboard'
import type { JobRunRow } from '@/types/jobs'

/** What the panel shows of the latest job run; zeros when there was none. */
export function lastRunFacts(run: JobRunRow | null): LastRunFacts {
  if (!run) {
    return {
      lastRunAtMs: null,
      lastRunSuccess: null,
      lastRunProcessed: 0,
      lastRunIngested: 0,
      lastRunError: null,
    }
  }
  return {
    lastRunAtMs: run.runAt.getTime(),
    lastRunSuccess: run.success,
    lastRunProcessed: run.processed,
    lastRunIngested: run.ingested,
    lastRunError: run.errorSummary,
  }
}
