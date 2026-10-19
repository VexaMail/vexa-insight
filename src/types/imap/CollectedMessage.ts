import type { AttachmentResult } from './AttachmentResult'
import type { FinalizeProcessedMessageInput } from './FinalizeProcessedMessageInput'

/**
 * One downloaded report message whose reports are not yet ingested. It is
 * recorded as processed and post-processed (`finalize`) only once every
 * attachment ingested, so a failed ingest leaves the mail in place for the
 * next poll.
 */
export type CollectedMessage = {
  readonly attachments: AttachmentResult[]
  readonly finalize: FinalizeProcessedMessageInput
}
