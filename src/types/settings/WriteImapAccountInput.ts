import type { getDb } from '@/lib/db'
import type { ImapAccountUpdate } from './ImapAccountUpdate'

/** Everything one `imap_accounts` upsert needs to decide insert vs update. */
export type WriteImapAccountInput = {
  db: ReturnType<typeof getDb>
  account: ImapAccountUpdate
  sortOrder: number
  existingIds: ReadonlySet<number>
  existingPasswords: Record<number, string>
  secretKey: string
}
