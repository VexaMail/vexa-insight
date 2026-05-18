import { getDb, ipAddresses } from '@/lib/db'

/**
 * Inserts a single seed IP row and returns its generated id.
 */
export function insertSeedIp(now: Date): number {
  const db = getDb()
  const row = db
    .insert(ipAddresses)
    .values({
      ip: '203.0.113.1',
      emailsSentCount: 0,
      firstSeenAt: now,
      lastSeenAt: now,
      createdAt: now,
      updatedAt: now,
    })
    .returning({ id: ipAddresses.id })
    .all()
  const id = row[0]?.id
  if (id == null) throw new Error('insert ip failed')
  return id
}
