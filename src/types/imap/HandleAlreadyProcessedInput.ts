import type { ImapAccountConfig } from '@/types/config'
import type { ImapFlow } from 'imapflow'
import type { FetchAttachmentsOptions } from './FetchAttachmentsOptions'
import type { UidInfo } from './UidInfo'

/** One message already in processed_messages, and where it lives. */
export type HandleAlreadyProcessedInput = {
  client: ImapFlow
  account: ImapAccountConfig
  folder: string
  uid: number
  info: UidInfo
  options: FetchAttachmentsOptions
}
