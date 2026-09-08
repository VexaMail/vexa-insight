import type { getDb } from '@/lib/db'
import { imapAccounts } from '@/lib/db'
import type { ImapAccountUpdate } from '@/types/settings'
import { deleteRemovedImapAccounts } from './deleteRemovedImapAccounts'
import { getExistingImapPasswords } from './getExistingImapPasswords'
import { writeImapAccount } from './writeImapAccount'

/** Makes `imap_accounts` match the payload: delete, update and insert rows. */
export function syncImapAccounts(
  db: ReturnType<typeof getDb>,
  accounts: readonly ImapAccountUpdate[],
  secretKey: string,
): void {
  const hasAnyNewPassword = accounts.some(
    (account) =>
      account.password !== undefined && account.password.trim() !== '',
  )
  if (hasAnyNewPassword && !secretKey) {
    throw new Error(
      'SECRET_KEY must be configured before storing IMAP credentials',
    )
  }

  const existingIds = new Set(
    db
      .select({ id: imapAccounts.id })
      .from(imapAccounts)
      .all()
      .map((r) => r.id),
  )
  const existingPasswords = getExistingImapPasswords(db)

  deleteRemovedImapAccounts(db, accounts, existingIds)

  accounts.forEach((account, sortOrder) => {
    writeImapAccount({
      db,
      account,
      sortOrder,
      existingIds,
      existingPasswords,
      secretKey,
    })
  })
}
