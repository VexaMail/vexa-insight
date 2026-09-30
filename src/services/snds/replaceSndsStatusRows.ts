import { getDb, sndsIpStatus } from '@/lib/db'
import type { SndsStatusRow } from '@/types/snds'

/** Replaces the stored IP status list with the current one. */
export function replaceSndsStatusRows(
  rows: readonly SndsStatusRow[],
  fetchedAt: Date,
): number {
  getDb().transaction((tx) => {
    tx.delete(sndsIpStatus).run()
    if (rows.length > 0) {
      tx.insert(sndsIpStatus)
        .values(rows.map((row) => ({ ...row, fetchedAt })))
        .run()
    }
  })
  return rows.length
}
