import { domains, getDb } from '@/lib/db'
import { and, inArray, sql } from 'drizzle-orm'

/** Number of domains visible to the caller. */
export async function queryDomainCount(
  allowedIds: number[] | null,
): Promise<number> {
  const conditions =
    allowedIds !== null ? [inArray(domains.id, allowedIds)] : []
  const [row] = await getDb()
    .select({ count: sql<number>`count(*)` })
    .from(domains)
    .where(and(...conditions))

  return row?.count ?? 0
}
