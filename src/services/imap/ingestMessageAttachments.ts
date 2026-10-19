import { ingestOneAttachment } from '@/services/reports'
import type { AttachmentResult, MessageIngestOutcome } from '@/types/imap'

/**
 * Ingests every report of one message, counting duplicates as skipped. An
 * unexpected throw is recorded as an error rather than aborting the poll.
 */
export async function ingestMessageAttachments(
  attachments: readonly AttachmentResult[],
): Promise<MessageIngestOutcome> {
  const outcome: MessageIngestOutcome = { ingested: 0, skipped: 0, errors: [] }
  for (const att of attachments) {
    try {
      const r = await ingestOneAttachment(att)
      if (r.error) outcome.errors.push(r.error)
      else if (r.ingested) outcome.ingested += 1
      else outcome.skipped += 1
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      outcome.errors.push(`${att.filename}: ${message}`)
    }
  }
  return outcome
}
