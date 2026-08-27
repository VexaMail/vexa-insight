import { getDb, ipHostnameEnrichments } from '@/lib/db'

/**
 * Schedules a background lookup by inserting a pending row, if it does not
 * already exist.
 */
export async function scheduleLookup(ip: string): Promise<void> {
  const db = getDb()
  try {
    await db
      .insert(ipHostnameEnrichments)
      .values({
        ip,
        lookupStatus: 'pending',
      })
      .onConflictDoNothing({ target: ipHostnameEnrichments.ip })
  } catch (error) {
    console.error(`[scheduleLookup] Error scheduling lookup for ${ip}:`, error)
  }
}
