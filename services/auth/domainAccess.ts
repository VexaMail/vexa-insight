import { domains, getDb } from '@/lib/db'
import { getApiKeyRole } from '@/services/api'
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
  // Key-based automation has no session cookie. A valid shared admin key is
  // the `admin` role everywhere else (see `requirePermission`), so it must be
  // unrestricted here too -- otherwise every domain-scoped query silently
  // returns nothing for API callers.
  if (!session) return (await getApiKeyRole()) === 'admin' ? null : []

  const user = session.user
  if (user.role === 'admin') return null
  if (!user.allowedDomains) return null

  try {
    const domainNames = JSON.parse(user.allowedDomains)
    if (!Array.isArray(domainNames) || domainNames.length === 0) return []

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
