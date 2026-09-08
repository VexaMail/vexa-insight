import type { ImapAccountConfig } from '@/types/config'
import type { ImapFlow } from 'imapflow'
import type { FetchAttachmentsOptions } from './FetchAttachmentsOptions'
import type { UidInfo } from './UidInfo'

/** The UIDs of a chunk that still need a full fetch, and their envelopes. */
export type ProcessUnprocessedUidsInput = {
  client: ImapFlow
  account: ImapAccountConfig
  folder: string
  uids: number[]
  uidToMidMap: Map<number, UidInfo>
  options: FetchAttachmentsOptions
}
