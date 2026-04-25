import type { EmailProgressPayload } from '@/types/dashboard'

export type FetchAndIngestHooks = {
  getAbortRequested?: () => Promise<boolean>
  onProgress?: (processed: number) => Promise<void> | void
  onEmailProgress?: (payload: EmailProgressPayload) => Promise<void> | void
  onBatchProgress?: (
    processed: number,
    processing: number,
    total: number,
    etaMs: number,
  ) => Promise<void> | void
  onStatus?: (statusText: string) => Promise<void> | void
  postProcessAction: string
  postProcessFolder: string | null
  fetchIncludeTrash: boolean
  fetchIncludeAllFolders: boolean
  moveToTrashAfterProcess: boolean
  markAsReadAfterProcess: boolean
  jobRunId?: number
}
