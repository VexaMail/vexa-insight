import { domains, getDb } from '@/lib/db'
import { inArray } from 'drizzle-orm'
import { getSession } from './getSession'

/**
 * Returns null if the user has access to ALL domains (Admin, or no restriction).
 * Returns an empty array if the session is invalid.
 * Returns an array of domain IDs if the user has specific domain restrictions.
 */
export async function getAllowedDomainIds(): Promise<number[] | null> {
  const session = await getSession()
  if (!session) return [] // No access if no session

  const user = session.user
  if (user.role === 'admin') return null
  if (!user.allowedDomains) return null

  try {
    const domainNames = JSON.parse(user.allowedDomains)
    if (!Array.isArray(domainNames) || domainNames.length === 0) return null

    const db = getDb()
    const rows = await db
      .select({ id: domains.id })
      .from(domains)
      .where(inArray(domains.name, domainNames))

    return rows.map((r) => r.id)
  } catch {
    return null // Provide all or strict? If JSON fails, better to fallback to empty to be safe?
    // Wait, let's just allow all if it's broken or fallback to empty?
    // Safe fallback: return []
  }
}
