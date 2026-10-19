import { domains, getDb } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { getAllowedDomainNames } from './getAllowedDomainNames'

/** Whether the domain is monitored here and the caller may see it. */
export async function canAccessDomainName(
  domainName: string,
): Promise<boolean> {
  const allowed = await getAllowedDomainNames()
  if (allowed !== null) return allowed.has(domainName)
  const row = await getDb()
    .select({ id: domains.id })
    .from(domains)
    .where(eq(domains.name, domainName))
    .limit(1)
  return row.length > 0
}
