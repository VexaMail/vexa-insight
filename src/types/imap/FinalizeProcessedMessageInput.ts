import type { ImapAccountConfig } from '@/types/config'
import type { ImapFlow } from 'imapflow'
import type { FetchAttachmentsOptions } from './FetchAttachmentsOptions'

/** Bookkeeping performed once a message yielded valid DMARC attachments. */
export type FinalizeProcessedMessageInput = {
  client: ImapFlow
  account: ImapAccountConfig
  options: FetchAttachmentsOptions
  folder: string
  uidStr: string
  emailDate: string | undefined
  subject: string | undefined
  messageId: string
  attachmentCount: number
}
