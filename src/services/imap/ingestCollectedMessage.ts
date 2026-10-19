import type { CollectedMessage, MessageIngestOutcome } from '@/types/imap'
import { deferFailedMessage } from './deferFailedMessage'
import { finalizeProcessedMessage } from './finalizeProcessedMessage'
import { ingestMessageAttachments } from './ingestMessageAttachments'

/**
 * Ingests one message's reports and, only when all of them ingested or were
 * already stored, records the message and applies post-processing. Must run
 * while the folder's IMAP connection is still open.
 */
export async function ingestCollectedMessage(
  message: CollectedMessage,
): Promise<MessageIngestOutcome> {
  const outcome = await ingestMessageAttachments(message.attachments)
  if (outcome.errors.length > 0) {
    const line = await deferFailedMessage(
      message.finalize,
      outcome.errors.join('; '),
    )
    return { ...outcome, errors: [line] }
  }

  try {
    await finalizeProcessedMessage(message.finalize)
  } catch (err: unknown) {
    const reason = err instanceof Error ? err.message : String(err)
    const line = await deferFailedMessage(message.finalize, reason)
    return { ...outcome, errors: [line] }
  }
  return outcome
}
