import { getDb, imapAccounts } from '@/lib/db'
import { asc } from 'drizzle-orm'
import { decryptStoredPassword } from './decryptStoredPassword'
import type { ImapAccountRow } from './ImapAccountRow'
import { resolveSecretKey } from './resolveSecretKey'

/**
 * Returns all imap_accounts rows ordered by sortOrder.
 *
 * Decrypts each row's password using the current SECRET_KEY. Legacy plaintext
 * rows (no `v1:` prefix) are passed through unchanged so they keep working
 * until the lazy migration in `encryptLegacyImapPasswords` upgrades them.
 *
 * We resolve the secret directly rather than through `getConfig()` to avoid the
 * circular dependency: `getConfig()` calls this function while building its own
 * cache, so calling `getConfig()` here would recurse.
 *
 * An encrypted password with no key available is a hard error. Passing the
 * ciphertext through would send it to the mail server as the password, turning
 * a configuration fault into a silent authentication failure.
 */
function getImapAccountsRow(): ImapAccountRow[] {
  const db = getDb()
  const secretKey = resolveSecretKey()
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
    password: decryptStoredPassword(r.password, secretKey, r.id),
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
