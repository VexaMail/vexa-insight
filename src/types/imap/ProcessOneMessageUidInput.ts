import type { ImapAccountConfig } from '@/types/config'
import type { FetchMessageObject, ImapFlow } from 'imapflow'
import type { FetchAttachmentsOptions } from './FetchAttachmentsOptions'

/** Everything needed to process one message UID of one mailbox folder. */
export type ProcessOneMessageUidInput = {
  client: ImapFlow
  account: ImapAccountConfig
  uid: number
  folder: string
  options: FetchAttachmentsOptions
  providedEnvMsg?: FetchMessageObject | undefined
}
