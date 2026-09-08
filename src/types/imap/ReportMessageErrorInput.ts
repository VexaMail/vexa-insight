import type { FetchAttachmentsOptions } from './FetchAttachmentsOptions'

/** Context for reporting a single message's processing failure. */
export type ReportMessageErrorInput = {
  options: FetchAttachmentsOptions
  accountId: number
  uidStr: string
  emailDate: string | undefined
  error: unknown
}
