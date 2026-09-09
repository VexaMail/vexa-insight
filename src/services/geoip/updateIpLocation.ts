import { getDb, ipAddresses } from '@/lib/db'
import { eq } from 'drizzle-orm'

/** Re-stamps a stale row with a fresh country and marks it seen now. */
export async function updateIpLocation(
  id: number,
  countryCode: string | null,
  now: Date,
): Promise<void> {
  await getDb()
    .update(ipAddresses)
    .set({
      countryCode,
      locationLastUpdate: now,
      lastSeenAt: now,
      updatedAt: now,
    })
    .where(eq(ipAddresses.id, id))
}
