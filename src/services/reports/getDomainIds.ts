import { domains, getDb } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import { desc, inArray } from 'drizzle-orm'

/**
 * Returns all domain ids (as strings) visible to the current user,
 * newest-updated first. Users with an empty allow-list get no ids.
 */
export async function getDomainIds(): Promise<string[]> {
  const db = getDb()
  const allowedIds = await getAllowedDomainIds()

  if (allowedIds !== null && allowedIds.length === 0) {
    return []
  }

  const query = db.select({ id: domains.id }).from(domains)

  if (allowedIds !== null) {
    query.where(inArray(domains.id, allowedIds))
  }

  const result = await query.orderBy(desc(domains.updatedAt))
  return result.map((r) => r.id.toString())
}
