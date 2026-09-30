import { SNDS_CONNECTION_ID } from '@/constants/snds'
import { getDb, sndsConnection } from '@/lib/db'
import { eq } from 'drizzle-orm'

/** The SNDS connection row, or undefined before the first connect. */
export function getSndsConnectionRow():
  typeof sndsConnection.$inferSelect | undefined {
  return getDb()
    .select()
    .from(sndsConnection)
    .where(eq(sndsConnection.id, SNDS_CONNECTION_ID))
    .get()
}
