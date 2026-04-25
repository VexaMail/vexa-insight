import { domains, getDb } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { DomainRow } from '@/types/reports'
import { inArray } from 'drizzle-orm'

/**
 * Returns all domains.
 */
export async function getDomains(): Promise<DomainRow[]> {
  const db = getDb()
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return []

  const query = db.select({ id: domains.id, name: domains.name }).from(domains)
  if (allowedIds !== null) {
    query.where(inArray(domains.id, allowedIds))
  }

  const rows = await query
  return rows
}
