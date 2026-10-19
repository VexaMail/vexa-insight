import { domains, getDb } from '@/lib/db'
import { inArray } from 'drizzle-orm'
import { getAllowedDomainIds } from './domainAccess'

/**
 * The names of the domains the caller may see, or null when unrestricted.
 * Same rules as `getAllowedDomainIds`; an empty set denies everything.
 */
export async function getAllowedDomainNames(): Promise<Set<string> | null> {
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds === null) return null
  if (allowedIds.length === 0) return new Set()
  const rows = await getDb()
    .select({ name: domains.name })
    .from(domains)
    .where(inArray(domains.id, allowedIds))
  return new Set(rows.map((row) => row.name))
}
