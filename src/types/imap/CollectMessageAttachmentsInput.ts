import type { ImapAccountConfig } from '@/types/config'
import type { parseDmarcAttachmentsFromParts } from '@/utils/imap'
import type { ImapFlow } from 'imapflow'
import type { EnvelopeSummary } from './EnvelopeSummary'
import type { FetchAttachmentsOptions } from './FetchAttachmentsOptions'

/** A message whose DMARC candidate parts are known and ready to download. */
export type CollectMessageAttachmentsInput = {
  readonly account: ImapAccountConfig
  readonly client: ImapFlow
  readonly folder: string
  readonly options: FetchAttachmentsOptions
  readonly uidStr: string
  readonly partIds: string[]
  readonly bodyStructure: Parameters<typeof parseDmarcAttachmentsFromParts>[2]
  readonly summary: EnvelopeSummary
}
