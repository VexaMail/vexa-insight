import type { FetchAndIngestHooks, FetchAttachmentsOptions } from '@/types/imap'

/**
 * Maps FetchAndIngestHooks to FetchAttachmentsOptions for fetchAttachments.
 */
export function buildFetchAttachmentsOptionsFromHooks(
  hooks: FetchAndIngestHooks,
): FetchAttachmentsOptions {
  return {
    getAbortRequested: hooks.getAbortRequested,
    onEmailProgress: hooks.onEmailProgress,
    onBatchProgress: hooks.onBatchProgress,
    onStatus: hooks.onStatus,
    postProcessAction: hooks.postProcessAction,
    postProcessFolder: hooks.postProcessFolder,
    fetchIncludeTrash: hooks.fetchIncludeTrash,
    fetchIncludeAllFolders: hooks.fetchIncludeAllFolders,
    moveToTrashAfterProcess: hooks.moveToTrashAfterProcess,
    markAsReadAfterProcess: hooks.markAsReadAfterProcess,
    ...(hooks.jobRunId !== undefined ? { jobRunId: hooks.jobRunId } : {}),
  }
}
