/**
 * Minimal shape for a mailbox from IMAP LIST (path and optional special-use).
 */
export type MailboxListItem = {
  path: string
  specialUse?: string | string[]
}
