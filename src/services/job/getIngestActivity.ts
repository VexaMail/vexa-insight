import { getDb, jobRuns } from '@/lib/db'
import type { IngestActivityPoint } from '@/types/ingest'
import { gte, sql } from 'drizzle-orm'

/** Daily ingestion totals of the last `days` days, oldest first. */
export async function getIngestActivity(
  days: number = 30,
): Promise<IngestActivityPoint[]> {
  const db = getDb()
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

  return db
    .select({
      date: sql<string>`strftime('%Y-%m-%d', ${jobRuns.runAt}, 'unixepoch')`.as(
        'day',
      ),
      successfulRuns: sql<number>`sum(case when ${jobRuns.errorCount} = 0 then 1 else 0 end)`,
      failedRuns: sql<number>`sum(case when ${jobRuns.errorCount} > 0 then 1 else 0 end)`,
      processed: sql<number>`sum(${jobRuns.processed})`,
      ingested: sql<number>`sum(${jobRuns.ingested})`,
      errors: sql<number>`sum(${jobRuns.errorCount})`,
    })
    .from(jobRuns)
    .where(gte(jobRuns.runAt, since))
    .groupBy(sql`day`)
    .orderBy(sql`day`)
}
