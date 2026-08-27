import { domains, getDb } from '@/lib/db'

/**
 * Pings the database. Returns true if the DB is reachable, false otherwise.
 */
export async function checkDb(): Promise<boolean> {
  try {
    const db = getDb()
    await db.select({ id: domains.id }).from(domains).limit(1)
    return true
  } catch {
    return false
  }
}
