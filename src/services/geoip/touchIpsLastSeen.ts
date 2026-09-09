import { getDb, ipAddresses } from '@/lib/db'
import { inArray } from 'drizzle-orm'

/** Marks fresh rows as seen now without touching their location. */
export async function touchIpsLastSeen(
  ids: number[],
  now: Date,
): Promise<void> {
  if (ids.length === 0) return
  await getDb()
    .update(ipAddresses)
    .set({ lastSeenAt: now, updatedAt: now })
    .where(inArray(ipAddresses.id, ids))
}
