import { SNDS_CONNECTION_ID } from '@/constants/snds'
import { getDb, sndsConnection } from '@/lib/db'
import type { SndsConnectionPatch } from '@/types/snds'

/** Writes fields of the single SNDS connection row, creating it if needed. */
export function saveSndsConnection(patch: SndsConnectionPatch): void {
  const updatedAt = new Date()
  getDb()
    .insert(sndsConnection)
    .values({ id: SNDS_CONNECTION_ID, ...patch, updatedAt })
    .onConflictDoUpdate({
      target: sndsConnection.id,
      set: { ...patch, updatedAt },
    })
    .run()
}
