import type { FetchAttachmentsOptions } from './FetchAttachmentsOptions'

/** Counters a folder scan reports after each chunk. */
export type BatchProgressInput = {
  options: FetchAttachmentsOptions
  folderProcessedCount: number
  processingCount: number
  folderTotalEmails: number
  startTime: number
}
