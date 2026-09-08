import type { EmailProgressPayload } from '@/types/dashboard'
import { getPollStatusFromDb } from './getPollStatusFromDb'
import { processAccount } from './processAccount'
import type { ProcessAllAccountsInput } from './ProcessAllAccountsInput'

/** Walks the configured accounts, accumulating into `totals` as it goes. */
export async function processAllAccounts({
  accounts,
  days,
  totals,
  coalescer,
  eventBuffer,
  jobRunId,
}: ProcessAllAccountsInput): Promise<void> {
  const getAbortRequested = async (): Promise<boolean> => {
    const r = await getPollStatusFromDb()
    return r.abortRequested
  }
  const onEmailProgress = async (
    payload: EmailProgressPayload,
  ): Promise<void> => {
    if (!eventBuffer) return
    await eventBuffer.add(payload)
  }

  for (let ai = 0; ai < accounts.length; ai++) {
    const account = accounts[ai]
    if (!account) continue
    if (await getAbortRequested()) break

    const result = await processAccount({
      account,
      accountIndex: ai,
      totalAccounts: accounts.length,
      days,
      totalProcessedSoFar: totals.processed,
      getAbortRequested,
      onEmailProgress,
      coalescer,
      jobRunId,
    })

    totals.processed += result.processed
    totals.ingested += result.ingested
    totals.skipped += result.skipped
    for (const err of result.errors) {
      totals.errors.push(err)
      console.error('[ingest]', err)
    }
  }
}
