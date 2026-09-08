import type { ImapAccountConfig } from '@/types/config'
import type { ImapFlow } from 'imapflow'
import type { FetchAttachmentsOptions } from './FetchAttachmentsOptions'

/** Everything needed to process one chunk of UIDs within a folder scan. */
export type ProcessChunkInput = {
  client: ImapFlow
  account: ImapAccountConfig
  folder: string
  chunk: number[]
  chunkIndex: number
  chunkSize: number
  folderTotalEmails: number
  folderProcessedCount: number
  startTime: number
  options: FetchAttachmentsOptions
}
