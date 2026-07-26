import { getDb, ipAddresses } from '@/lib/db'

/**
 * Inserts a single seed IP row and returns its generated id. The address is
 * overridable so a test can seed a second, differently-scoped sender.
 */
export function insertSeedIp(now: Date, ip: string = '203.0.113.1'): number {
  const db = getDb()
  const row = db
    .insert(ipAddresses)
    .values({
      ip,
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
