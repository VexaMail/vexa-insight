import { getDb, sndsIpStatus } from '@/lib/db'

/** The stored SNDS IP status list (blocked or flagged ranges). */
export function listSndsStatusRows(): (typeof sndsIpStatus.$inferSelect)[] {
  return getDb().select().from(sndsIpStatus).all()
}
