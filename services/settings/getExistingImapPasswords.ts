import type { getDb } from '@/lib/db'
import { imapAccounts } from '@/lib/db'

/**
 * Returns a map of imap_account id -> password for preserving passwords on update.
 */
function getExistingImapPasswords(
  db: ReturnType<typeof getDb>,
): Record<number, string> {
  const rows = db
    .select({ id: imapAccounts.id, password: imapAccounts.password })
    .from(imapAccounts)
    .all()
  const out: Record<number, string> = {}
  for (const r of rows) {
    out[r.id] = r.password
  }
  return out
}

export { getExistingImapPasswords }
