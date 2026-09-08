import type { ImapAccountConfig } from '@/types/config'
import type { FetchAttachmentsOptions } from './FetchAttachmentsOptions'

/** One `processing_records` progress event, repeated `count` times. */
export type NotifyProcessingRecordsInput = {
  options: FetchAttachmentsOptions
  account: ImapAccountConfig
  emailDate: string | undefined
  subject: string | undefined
  uidStr: string
  count: number
}
