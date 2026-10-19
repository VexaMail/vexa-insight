import type { FinalizeProcessedMessageInput } from '@/types/imap'

/** The per-poll error line for a message left in its mailbox for a retry. */
export function describeDeferredMessage(
  finalize: FinalizeProcessedMessageInput,
  reason: string,
): string {
  return `message ${finalize.messageId} (uid ${finalize.uidStr} in ${finalize.folder}) left in place for the next poll: ${reason}`
}
