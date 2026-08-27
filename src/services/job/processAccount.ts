import { runFetchAndIngest } from '@/services/imap'
import type { ImapAccountConfig } from '@/types/config'
import type { EmailProgressPayload } from '@/types/dashboard'
import type { AccountResult } from './AccountResult'
import type { PollStatusCoalescer } from './PollStatusCoalescer'

/**
 * Runs fetch + ingest for a single IMAP account.
 *
 * Progress is routed through the coalescer so poll_status is written at a
 * bounded cadence rather than once per email; status-text transitions flush
 * immediately so the UI reflects the current folder/account without lag.
 */
export async function processAccount(
  account: ImapAccountConfig,
  accountIndex: number,
  totalAccounts: number,
  days: number,
  totalProcessedSoFar: number,
  getAbortRequested: () => Promise<boolean>,
  onEmailProgress: (payload: EmailProgressPayload) => Promise<void>,
  coalescer: PollStatusCoalescer,
  jobRunId: number | undefined,
): Promise<AccountResult> {
  await coalescer.report(
    {
      statusText: `Starting account ${accountIndex + 1}/${totalAccounts}: ${account.server}…`,
    },
    true,
  )

  try {
    const fetchResult = await runFetchAndIngest(days, account, {
      getAbortRequested,
      onProgress: async (n) => {
        await coalescer.report({ currentProcessed: totalProcessedSoFar + n })
      },
      onBatchProgress: async (p, processing, total, etaMs) => {
        await coalescer.report({
          currentProcessed: totalProcessedSoFar + p,
          totalEmails: totalProcessedSoFar + total,
          processingEmails: processing,
          etaMs,
        })
      },
      onStatus: async (statusText) => {
        await coalescer.report({ statusText }, true)
      },
      onEmailProgress,
      postProcessAction: account.postProcessAction,
      postProcessFolder: account.postProcessFolder,
      fetchIncludeTrash: account.fetchIncludeTrash,
      fetchIncludeAllFolders: account.fetchIncludeAllFolders,
      moveToTrashAfterProcess: account.moveToTrashAfterProcess,
      markAsReadAfterProcess: account.markAsReadAfterProcess,
      ...(jobRunId !== undefined ? { jobRunId } : {}),
    })

    return {
      processed: fetchResult.processed,
      ingested: fetchResult.ingested,
      skipped: fetchResult.skipped,
      errors: [...fetchResult.errors],
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[ingest] job failed for account:', account.server, message)
    return { processed: 0, ingested: 0, skipped: 0, errors: [message] }
  }
}
