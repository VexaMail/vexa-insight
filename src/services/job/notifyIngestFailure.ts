import { fireAndForgetDispatch } from '@/services/notifications'
import type { IngestJobTotals } from './IngestJobTotals'

/** Dispatches `ingest.failed` when any account reported an error. */
export function notifyIngestFailure(
  jobRunId: number | undefined,
  totals: IngestJobTotals,
): void {
  if (totals.errors.length === 0) return

  fireAndForgetDispatch('ingest.failed', {
    jobRunId: jobRunId ?? null,
    processed: totals.processed,
    ingested: totals.ingested,
    skipped: totals.skipped,
    errorCount: totals.errors.length,
    errors: totals.errors.slice(0, 10),
  })
}
