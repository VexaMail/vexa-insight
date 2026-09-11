import { getDb, imapAccounts } from '@/lib/db'
import { encryptSecret, isEncrypted } from '@/services/crypto'
import { resolveSecretKey } from '@/services/settings-store'
import { eq } from 'drizzle-orm'

/**
 * One-shot migration that walks `imap_accounts` and replaces any plaintext
 * password (no `v1:` prefix) with a freshly encrypted blob.
 *
 * Safe to call repeatedly: rows already encrypted are skipped. Bails out
 * silently when the SECRET_KEY is unset so first-boot-before-install does
 * nothing destructive. Resolves the key directly rather than through
 * `getConfig()` to avoid pulling the full config cache during early startup.
 */
function encryptLegacyImapPasswords(): { migrated: number } {
  const db = getDb()
  const secretKey = resolveSecretKey()
  if (!secretKey) return { migrated: 0 }
  const rows = db.select().from(imapAccounts).all()
  let migrated = 0
  for (const row of rows) {
    if (!row.password) continue
    if (isEncrypted(row.password)) continue
    const ct = encryptSecret(row.password, secretKey)
    db.update(imapAccounts)
      .set({ password: ct })
      .where(eq(imapAccounts.id, row.id))
      .run()
    migrated++
  }
  return { migrated }
}

export { encryptLegacyImapPasswords }
