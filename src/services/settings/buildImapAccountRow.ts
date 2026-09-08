import type { imapAccounts } from '@/lib/db'
import type { ImapAccountUpdate } from '@/types/settings'

/** Column values shared by the insert and update paths of an IMAP account. */
export function buildImapAccountRow(
  account: ImapAccountUpdate,
  sortOrder: number,
): Omit<typeof imapAccounts.$inferInsert, 'id' | 'password'> {
  return {
    label: account.label,
    server: account.server,
    port: account.port,
    username: account.username,
    sortOrder,
    fetchIncludeTrash: account.fetchIncludeTrash ?? false,
    fetchIncludeAllFolders: account.fetchIncludeAllFolders ?? false,
    postProcessAction: account.postProcessAction ?? 'none',
    postProcessFolder: account.postProcessFolder ?? null,
    moveToTrashAfterProcess: account.moveToTrashAfterProcess ?? false,
    markAsReadAfterProcess: account.markAsReadAfterProcess ?? false,
  }
}
