import type { FetchAndIngestHooks } from '@/types/imap'
import type { ProcessAccountInput } from './ProcessAccountInput'

/**
 * Fetch-and-ingest options for one account. Progress is routed through the
 * coalescer so poll_status is written at a bounded cadence rather than once per
 * email; status-text transitions flush immediately so the UI reflects the
 * current folder without lag.
 */
export function accountFetchHooks(
  input: ProcessAccountInput,
): FetchAndIngestHooks {
  const { account, coalescer, jobRunId, totalProcessedSoFar } = input

  return {
    getAbortRequested: input.getAbortRequested,
    onEmailProgress: input.onEmailProgress,
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
    postProcessAction: account.postProcessAction,
    postProcessFolder: account.postProcessFolder,
    fetchIncludeTrash: account.fetchIncludeTrash,
    fetchIncludeAllFolders: account.fetchIncludeAllFolders,
    moveToTrashAfterProcess: account.moveToTrashAfterProcess,
    markAsReadAfterProcess: account.markAsReadAfterProcess,
    ...(jobRunId !== undefined ? { jobRunId } : {}),
  }
}
