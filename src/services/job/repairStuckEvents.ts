import { getDb, processedMessages } from '@/lib/db'
import { inArray } from 'drizzle-orm'
import type { StuckJobRunRow } from './StuckJobRunRow'

/**
 * Finds job runs that have emails stuck without a terminal event (done/error/already_processed)
 * and deletes those emails from `processed_messages`.
 *
 * This unlocks them for re-download on the next IMAP poll. The full pipeline
 * (download → DMARC parse → ingest → mark read → done) will run again.
 * `ingestParsedReport` is idempotent: it won't duplicate DMARC records that already exist.
 *
 * Returns the count of processed_messages rows deleted.
 */
export async function repairStuckEvents(): Promise<number> {
  const db = getDb()
  const raw = db.$client

  // 1. Find distinct job_run_ids that still have stuck (non-terminal) emails
  const stuckRunRows = raw
    .prepare(
      `
      SELECT DISTINCT e.job_run_id
      FROM job_poll_events e
      INNER JOIN (
        SELECT job_run_id, imap_account_id, message_uid, MAX(id) AS max_id
        FROM job_poll_events
        GROUP BY job_run_id, imap_account_id, message_uid
      ) latest ON e.id = latest.max_id
      WHERE e.step NOT IN ('done', 'error', 'already_processed')
    `,
    )
    .all() as StuckJobRunRow[]

  if (stuckRunRows.length === 0) return 0

  const stuckRunIds = stuckRunRows.map((r) => r.job_run_id)

  // 2. Delete those emails from processed_messages so the next poll re-downloads them
  const result = await db
    .delete(processedMessages)
    .where(inArray(processedMessages.jobRunId, stuckRunIds))

  const deleted = (result as unknown as { changes: number }).changes

  if (deleted > 0) {
    console.info(
      `[ingest] repairStuckEvents: unlocked ${String(deleted)} emails for re-processing (runs: ${stuckRunIds.join(', ')})`,
    )
  }

  return deleted
}
