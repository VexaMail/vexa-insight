import { domains, getDb } from '@/lib/db'
import { eq } from 'drizzle-orm'

export async function ensureDemoDomain(
  name: string,
  now: Date,
): Promise<number> {
  const db = getDb()
  const existing = db
    .select({ id: domains.id })
    .from(domains)
    .where(eq(domains.name, name))
    .get()
  if (existing) return existing.id
  const inserted = db
    .insert(domains)
    .values({ name, active: true, createdAt: now, updatedAt: now })
    .returning({ id: domains.id })
    .get()
  return inserted.id
}
