import { getDb, imapAccounts } from '@/lib/db'
import { decryptSecret } from '@/services/crypto'
import { asc } from 'drizzle-orm'
import { getSettingsRow } from './getSettingsRow'
import type { ImapAccountRow } from './ImapAccountRow'

/**
 * Returns all imap_accounts rows ordered by sortOrder.
 *
 * Decrypts each row's password using the current SECRET_KEY. Legacy plaintext
 * rows (no `v1:` prefix) are passed through unchanged so they keep working
 * until the lazy migration in `encryptLegacyImapPasswords` upgrades them.
 *
 * We read the secret directly from `getSettingsRow()` rather than `getConfig()`
 * to avoid the circular dependency: `getConfig()` calls this function while
 * building its own cache, so calling `getConfig()` here would recurse.
 */
function getImapAccountsRow(): ImapAccountRow[] {
  const db = getDb()
  const settings = getSettingsRow()
  const secretKey = settings?.secretKey ?? ''
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
    password:
      r.password && secretKey
        ? decryptSecret(r.password, secretKey)
        : r.password,
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
