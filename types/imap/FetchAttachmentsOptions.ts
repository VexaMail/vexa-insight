import type { EmailProgressPayload } from '@/types/dashboard'

/**
 * Options for fetchAttachments: folder selection, progress, move-to-trash, abort.
 */
export type FetchAttachmentsOptions = {
  getAbortRequested?: (() => Promise<boolean>) | undefined
  onEmailProgress?:
    ((payload: EmailProgressPayload) => Promise<void> | void) | undefined
  onBatchProgress?:
    | ((
        processed: number,
        processing: number,
        total: number,
        etaMs: number,
      ) => Promise<void> | void)
    | undefined
  onStatus?: ((statusText: string) => Promise<void> | void) | undefined
  postProcessAction: string
  postProcessFolder: string | null | undefined
  fetchIncludeTrash: boolean
  fetchIncludeAllFolders: boolean
  moveToTrashAfterProcess: boolean
  markAsReadAfterProcess: boolean
  jobRunId?: number | undefined
}
