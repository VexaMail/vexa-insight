import { imapAccounts } from '@/lib/db'
import { encryptSecret } from '@/services/crypto'
import type { WriteImapAccountInput } from '@/types/settings'
import { eq } from 'drizzle-orm'
import { buildImapAccountRow } from './buildImapAccountRow'
import { derivePasswordForWrite } from './derivePasswordForWrite'

/** Updates an existing `imap_accounts` row, or inserts a new one. */
export function writeImapAccount(input: WriteImapAccountInput): void {
  const { db, account, sortOrder, existingIds, existingPasswords, secretKey } =
    input
  const hasNewPassword =
    account.password !== undefined && account.password.trim() !== ''
  const row = buildImapAccountRow(account, sortOrder)

  if (account.id != null && existingIds.has(account.id)) {
    db.update(imapAccounts)
      .set(
        hasNewPassword && account.password
          ? {
              ...row,
              password: encryptSecret(account.password.trim(), secretKey),
            }
          : row,
      )
      .where(eq(imapAccounts.id, account.id))
      .run()
    return
  }

  db.insert(imapAccounts)
    .values({
      ...row,
      password: derivePasswordForWrite({
        hasNewPassword,
        newPassword: account.password,
        existingPassword:
          account.id != null ? existingPasswords[account.id] : undefined,
        secretKey,
      }),
    })
    .run()
}
