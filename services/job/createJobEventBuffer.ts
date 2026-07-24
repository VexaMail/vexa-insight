import { getDb, jobPollEvents } from '@/lib/db'
import type { EmailProgressPayload } from '@/types/dashboard'
import type { JobEventBuffer } from './JobEventBuffer'

/**
 * Creates a buffer that batches job_poll_events writes for one job run.
 *
 * The ingest pipeline emits several progress steps per email; at a million
 * emails that is millions of single-row inserts, each its own transaction.
 * Batching into multi-row inserts collapses that to a few thousand statements
 * without losing any event. The buffer is job-scoped, so callers create one per
 * runIngestJob and flush it once at the end.
 */
export function createJobEventBuffer(jobRunId: number): JobEventBuffer {
  // Maximum label length persisted (matches the schema text column) and the
  // number of rows accumulated before a multi-row insert is issued.
  const MAX_LABEL_LENGTH = 255
  const FLUSH_EVERY_N_ROWS = 200

  const db = getDb()
  let rows: (typeof jobPollEvents.$inferInsert)[] = []

  async function flush(): Promise<void> {
    if (rows.length === 0) return
    const toWrite = rows
    rows = []
    await db.insert(jobPollEvents).values(toWrite)
  }

  async function add(payload: EmailProgressPayload): Promise<void> {
    const label = payload.subject || `UID: ${payload.uid}`
    rows.push({
      jobRunId,
      imapAccountId: payload.accountId,
      messageUid: payload.uid,
      step: payload.step,
      messageLabel: label.slice(0, MAX_LABEL_LENGTH),
      error: payload.error ?? null,
      createdAt: new Date(),
    })
    if (rows.length >= FLUSH_EVERY_N_ROWS) {
      await flush()
    }
  }

  return { add, flush }
}
