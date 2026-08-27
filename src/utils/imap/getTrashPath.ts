import type { MailboxListItem } from '@/types/imap'
import { hasTrashUse } from './hasTrashUse'

/**
 * Returns the path of the mailbox with \\Trash special use, or null if none.
 */
export function getTrashPath(mailboxes: MailboxListItem[]): string | null {
  return mailboxes.find(hasTrashUse)?.path ?? null
}
