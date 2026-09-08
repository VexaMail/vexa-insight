import type { ImapAccountConfig } from '@/types/config'
import type { ImapFlow } from 'imapflow'
import type { FetchAttachmentsOptions } from './FetchAttachmentsOptions'
import type { UidInfo } from './UidInfo'

/** Everything needed to decide which UIDs of a chunk still need processing. */
export type FilterChunkUidsInput = {
  client: ImapFlow
  account: ImapAccountConfig
  folder: string
  chunk: number[]
  uidToMidMap: Map<number, UidInfo>
  processedIdsSet: Set<string>
  options: FetchAttachmentsOptions
}
