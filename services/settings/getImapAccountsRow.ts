import { getDb, imapAccounts } from '@/lib/db'
import { asc } from 'drizzle-orm'
import type { ImapAccountRow } from './ImapAccountRow'

/**
 * Returns all imap_accounts rows ordered by sortOrder.
 */
function getImapAccountsRow(): ImapAccountRow[] {
  const db = getDb()
  const rows = db
    .select()
    .from(imapAccounts)
    .orderBy(asc(imapAccounts.sortOrder))
    .all()
  return rows.map((r) => ({
    id: r.id,
    label: r.label,
    server: r.server,
    port: r.port,
    username: r.username,
    password: r.password,
    sortOrder: r.sortOrder,
    fetchIncludeTrash: r.fetchIncludeTrash,
    fetchIncludeAllFolders: r.fetchIncludeAllFolders,
    postProcessAction: r.postProcessAction,
    postProcessFolder: r.postProcessFolder,
    moveToTrashAfterProcess: r.moveToTrashAfterProcess,
    markAsReadAfterProcess: r.markAsReadAfterProcess,
  }))
}

export { getImapAccountsRow }
