import { domains, getDb } from '@/lib/db'

/**
 * Inserts `count` seed domains named example0.com, example1.com, ... and
 * returns their generated ids.
 */
export function insertSeedDomains(count: number, now: Date): number[] {
  const db = getDb()
  const ids: number[] = []
  for (let d = 0; d < count; d++) {
    const row = db
      .insert(domains)
      .values({
        name: `example${String(d)}.com`,
        createdAt: now,
        updatedAt: now,
        active: true,
      })
      .returning({ id: domains.id })
      .all()
    const id = row[0]?.id
    if (id == null) throw new Error('insert domain failed')
    ids.push(id)
  }
  return ids
}
