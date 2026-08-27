import { domains, getDb } from '@/lib/db'
import { hasValidApiKey } from '@/services/api/hasValidApiKey'
import { inArray } from 'drizzle-orm'
import { getSession } from './getSession'

/**
 * Returns null if the user has access to ALL domains (Admin, or no restriction).
 * Returns an empty array if the session is invalid.
 * Returns an array of domain IDs if the user has specific domain restrictions.
 *
 * A stored allow-list that is present but unusable (unparseable JSON, a
 * non-array, or an empty array) denies everything instead of granting
 * everything. `allowed_domains` is only ever written as `JSON.stringify` of a
 * validated `string[]`, so those shapes mean the record is corrupt or was
 * poked at directly -- and "restricted to nothing" must not read as
 * "unrestricted". No restriction is expressed by a NULL column, handled above.
 */
export async function getAllowedDomainIds(): Promise<number[] | null> {
  const session = await getSession()
  // Key-based automation has no session cookie. The shared key holds the
  // report permissions (see `API_KEY_PERMISSIONS`), so it must be unrestricted
  // here too -- otherwise every domain-scoped query silently returns nothing
  // for API callers.
  if (!session) return (await hasValidApiKey()) ? null : []

  const user = session.user
  if (user.role === 'admin') return null
  if (!user.allowedDomains) return null

  try {
    const parsed: unknown = JSON.parse(user.allowedDomains)
    if (!Array.isArray(parsed) || parsed.length === 0) return []
    const domainNames = parsed.filter(
      (name): name is string => typeof name === 'string',
    )
    if (domainNames.length === 0) return []

    const db = getDb()
    const rows = await db
      .select({ id: domains.id })
      .from(domains)
      .where(inArray(domains.name, domainNames))

    return rows.map((r) => r.id)
  } catch {
    return []
  }
}
