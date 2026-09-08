import { domains, getDb } from '@/lib/db'
import { eq } from 'drizzle-orm'

/** Id of a domain by its name, or null when no such domain is stored. */
export async function resolveDomainIdByName(
  name: string,
): Promise<number | null> {
  const found = await getDb()
    .select({ id: domains.id })
    .from(domains)
    .where(eq(domains.name, name))
    .limit(1)

  return found[0]?.id ?? null
}
