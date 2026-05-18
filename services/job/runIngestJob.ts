import { getDb, jobPollEvents, jobRuns } from '@/lib/db'
import { getConfig } from '@/services/config'
import { fireAndForgetDispatch } from '@/services/notifications'
import type { EmailProgressPayload } from '@/types/dashboard'
import { eq } from 'drizzle-orm'
import { getPollStatusFromDb } from './getPollStatusFromDb'
import { processAccount } from './processAccount'
import { repairStuckEvents } from './repairStuckEvents'
import { setPollStatusInDb } from './setPollStatusInDb'
import { startHeartbeat } from './startHeartbeat'

/**
 * Runs IMAP fetch+ingest for all configured accounts. Uses config.ingestionDaysBack.
 * Updates poll_status for progress and abort; records one job_runs row; returns result summary.
 */
export async function runIngestJob(): Promise<{
  processed: number
  ingested: number
  skipped: number
  errorCount: number
}> {
  const config = getConfig()
  const days = config.ingestionDaysBack
  const accounts = config.imapAccounts

  await repairStuckEvents()

  const db = getDb()
  const insertedRows = await db
    .insert(jobRuns)
    .values({
      runAt: new Date(),
      success: true,
      processed: 0,
      ingested: 0,
      errorCount: 0,
    })
    .returning({ id: jobRuns.id })
  const jobRunId = insertedRows[0]?.id

  await setPollStatusInDb({
    isRunning: true,
    lastCheck: new Date(),
    currentProcessed: 0,
    totalEmails: 0,
    abortRequested: false,
    activeJobRunId: jobRunId ?? null,
    statusText: 'Connecting to mail servers...',
  })

  let processed = 0
  let ingested = 0
  let skipped = 0
  const errors: string[] = []
  let totalProcessed = 0

  const getAbortRequested = async (): Promise<boolean> => {
    const r = await getPollStatusFromDb()
    return r.abortRequested
  }

  const onEmailProgress = async (
    payload: EmailProgressPayload,
  ): Promise<void> => {
    if (jobRunId === undefined) return
    const label = payload.subject || `UID: ${payload.uid}`
    await db.insert(jobPollEvents).values({
      jobRunId,
      imapAccountId: payload.accountId,
      messageUid: payload.uid,
      step: payload.step,
      messageLabel: label.slice(0, 255),
      error: payload.error ?? null,
      createdAt: new Date(),
    })
  }

  const heartbeatInterval = startHeartbeat()

  try {
    for (let ai = 0; ai < accounts.length; ai++) {
      const account = accounts[ai]
      if (!account) continue
      if (await getAbortRequested()) break

      const result = await processAccount(
        account,
        ai,
        accounts.length,
        days,
        totalProcessed,
        getAbortRequested,
        onEmailProgress,
        jobRunId,
      )

      processed += result.processed
      ingested += result.ingested
      skipped += result.skipped
      totalProcessed += result.processed
      for (const err of result.errors) {
        errors.push(err)
        console.error('[ingest]', err)
      }
    }
  } finally {
    clearInterval(heartbeatInterval)
    const errorCount = errors.length
    await setPollStatusInDb({
      isRunning: false,
      lastCheck: new Date(),
      abortRequested: false,
      processingEmails: 0,
      etaMs: 0,
      activeJobRunId: null,
      statusText: null,
    })
    if (jobRunId !== undefined) {
      try {
        await db
          .update(jobRuns)
          .set({
            runAt: new Date(),
            success: errorCount === 0,
            processed,
            ingested,
            errorCount,
            completedAt: new Date(),
          })
          .where(eq(jobRuns.id, jobRunId))
      } catch (updateErr) {
        console.error('[ingest] failed to update job run:', updateErr)
      }
    }
  }

  if (errors.length > 0) {
    fireAndForgetDispatch('ingest.failed', {
      jobRunId: jobRunId ?? null,
      processed,
      ingested,
      skipped,
      errorCount: errors.length,
      errors: errors.slice(0, 10),
    })
  }

  return {
    processed,
    ingested,
    skipped,
    errorCount: errors.length,
  }
}
