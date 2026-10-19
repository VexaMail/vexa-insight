import type { FinalizeProcessedMessageInput } from '@/types/imap'
import { describeDeferredMessage } from '@/utils/imap'
import { reportMessageError } from './reportMessageError'

/**
 * Leaves a message unrecorded and where it is, so the next poll downloads it
 * again, and reports why through the progress events. Returns the error line
 * the poll records.
 */
export async function deferFailedMessage(
  finalize: FinalizeProcessedMessageInput,
  reason: string,
): Promise<string> {
  const line = describeDeferredMessage(finalize, reason)
  console.warn('[ingest]', line)
  await reportMessageError({
    accountId: finalize.account.id,
    emailDate: finalize.emailDate,
    error: reason,
    options: finalize.options,
    uidStr: finalize.uidStr,
  })
  return line
}
