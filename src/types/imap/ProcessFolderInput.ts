import type { ImapAccountConfig } from '@/types/config'
import type { ImapFlow } from 'imapflow'
import type { FetchAttachmentsOptions } from './FetchAttachmentsOptions'

/** Everything needed to scan one mailbox folder of one account. */
export type ProcessFolderInput = {
  client: ImapFlow
  account: ImapAccountConfig
  folder: string
  since: Date
  options: FetchAttachmentsOptions
}
