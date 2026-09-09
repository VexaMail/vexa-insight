import type { ImapAccountConfig } from '@/types/config'
import { getImapAccountsRow } from './getImapAccountsRow'

/** The stored IMAP account with the given id as a connection config, if any. */
export function findImapAccountConfig(
  accountId: number,
): ImapAccountConfig | null {
  const row = getImapAccountsRow().find((r) => r.id === accountId)
  if (!row) return null
  return {
    id: row.id,
    server: row.server,
    port: row.port,
    username: row.username,
    password: row.password,
    fetchIncludeTrash: row.fetchIncludeTrash,
    fetchIncludeAllFolders: row.fetchIncludeAllFolders,
    postProcessAction: row.postProcessAction,
    postProcessFolder: row.postProcessFolder,
    moveToTrashAfterProcess: row.moveToTrashAfterProcess,
    markAsReadAfterProcess: row.markAsReadAfterProcess,
  }
}
