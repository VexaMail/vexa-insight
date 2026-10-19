import { getDb, rawReports } from '@/lib/db'
import { sql } from 'drizzle-orm'

/** When the newest aggregate report was stored, unix ms; null without any. */
export async function queryNewestIngestedAtMs(): Promise<number | null> {
  const [row] = await getDb()
    .select({ newest: sql<number | null>`max(${rawReports.ingestedAt})` })
    .from(rawReports)
  // `ingested_at` is stored in unix seconds (Drizzle `timestamp` mode).
  return row?.newest ? row.newest * 1000 : null
}
