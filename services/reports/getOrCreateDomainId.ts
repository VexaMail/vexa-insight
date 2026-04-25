import type { getDb } from '@/lib/db'
import { domains } from '@/lib/db'
import { eq } from 'drizzle-orm'

/**
 * Returns domain id by name; creates domain if missing.
 */
export async function getOrCreateDomainId(
  db: ReturnType<typeof getDb>,
  name: string,
): Promise<number> {
  const row = await db
    .select({ id: domains.id })
    .from(domains)
    .where(eq(domains.name, name))
    .limit(1)
  if (row[0]) return row[0].id
  const inserted = await db
    .insert(domains)
    .values({
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true,
    })
    .returning({ id: domains.id })
  const id = inserted[0]?.id
  if (id == null) throw new Error('Failed to insert domain')
  return id
}
