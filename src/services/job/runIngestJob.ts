import { getDb } from '@/lib/db'
import { getConfig } from '@/services/config'
import { beginPollStatus } from './beginPollStatus'
import { createJobEventBuffer } from './createJobEventBuffer'
import { createPollStatusCoalescer } from './createPollStatusCoalescer'
import { finalizeJobRun } from './finalizeJobRun'
import { finishPollStatus } from './finishPollStatus'
import type { IngestJobTotals } from './IngestJobTotals'
import { notifyIngestFailure } from './notifyIngestFailure'
import { processAllAccounts } from './processAllAccounts'
import { repairStuckEvents } from './repairStuckEvents'
import type { RunIngestJobOptions } from './RunIngestJobOptions'
import { startHeartbeat } from './startHeartbeat'
import { startJobRun } from './startJobRun'

/**
 * Runs IMAP fetch+ingest for all configured accounts. Uses config.ingestionDaysBack,
 * or the whole mailbox when options.fullRescan is set.
 * Updates poll_status for progress and abort; records one job_runs row; returns result summary.
 */
export async function runIngestJob(options: RunIngestJobOptions = {}): Promise<{
  processed: number
  ingested: number
  skipped: number
  errorCount: number
}> {
  const config = getConfig()
  const fullRescan = options.fullRescan === true

  await repairStuckEvents()

  const db = getDb()
  const jobRunId = await startJobRun(db)
  await beginPollStatus(jobRunId, fullRescan)

  const coalescer = createPollStatusCoalescer()
  const eventBuffer =
    jobRunId === undefined ? null : createJobEventBuffer(jobRunId)
  const heartbeatInterval = startHeartbeat()
  const totals: IngestJobTotals = {
    processed: 0,
    ingested: 0,
    skipped: 0,
    errors: [],
  }

  try {
    await processAllAccounts({
      accounts: config.imapAccounts,
      // getSinceDate() maps 0 to the epoch, i.e. no date filter at all.
      days: fullRescan ? 0 : config.ingestionDaysBack,
      totals,
      coalescer,
      eventBuffer,
      jobRunId,
    })
  } finally {
    clearInterval(heartbeatInterval)
    if (eventBuffer) await eventBuffer.flush()
    await coalescer.flush()
    await finishPollStatus()
    await finalizeJobRun(db, jobRunId, totals)
  }

  notifyIngestFailure(jobRunId, totals)

  return {
    processed: totals.processed,
    ingested: totals.ingested,
    skipped: totals.skipped,
    errorCount: totals.errors.length,
  }
}
