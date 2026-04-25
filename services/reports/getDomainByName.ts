import { domains, getDb } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import { and, eq, inArray } from 'drizzle-orm'

/**
 * Looks up a domain numeric ID by its name.
 * Returns null if not found or not allowed.
 */
export async function getDomainByName(
  name: string,
): Promise<{ id: number; name: string } | null> {
  const db = getDb()
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return null

  const conditions = [eq(domains.name, name)]
  if (allowedIds !== null) {
    conditions.push(inArray(domains.id, allowedIds))
  }

  const row = await db
    .select({ id: domains.id, name: domains.name })
    .from(domains)
    .where(and(...conditions))
    .limit(1)

  return row[0] ?? null
}
