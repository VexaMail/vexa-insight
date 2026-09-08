import type { getDb } from '@/lib/db'
import { imapAccounts } from '@/lib/db'
import type { ImapAccountUpdate } from '@/types/settings'
import { eq } from 'drizzle-orm'

/** Removes stored accounts whose id no longer appears in the payload. */
export function deleteRemovedImapAccounts(
  db: ReturnType<typeof getDb>,
  accounts: readonly ImapAccountUpdate[],
  existingIds: ReadonlySet<number>,
): void {
  const idsInPayload = new Set(
    accounts
      .map((account) => account.id)
      .filter((id): id is number => typeof id === 'number' && id > 0),
  )

  for (const id of existingIds) {
    if (!idsInPayload.has(id)) {
      db.delete(imapAccounts).where(eq(imapAccounts.id, id)).run()
    }
  }
}
