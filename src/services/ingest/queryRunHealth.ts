import { HEALTH_WINDOW_MS } from '@/constants/ingest'
import { getDb, jobRuns } from '@/lib/db'
import type { IngestRunHealth } from '@/types/ingest'
import { desc, eq, gte, sql } from 'drizzle-orm'
import { queryLastRunHealth } from './queryLastRunHealth'

/** The latest run, the latest successful run and the last day's failures. */
export async function queryRunHealth(now: Date): Promise<IngestRunHealth> {
  const db = getDb()
  const last = await queryLastRunHealth()
  const [lastSuccess] = await db
    .select({ runAt: jobRuns.runAt })
    .from(jobRuns)
    .where(eq(jobRuns.success, true))
    .orderBy(desc(jobRuns.runAt))
    .limit(1)
  const [day] = await db
    .select({
      runs: sql<number>`cast(count(*) as integer)`,
      failed: sql<number>`cast(coalesce(sum(case when ${jobRuns.success} = 0 then 1 else 0 end), 0) as integer)`,
    })
    .from(jobRuns)
    .where(gte(jobRuns.runAt, new Date(now.getTime() - HEALTH_WINDOW_MS)))

  return {
    ...last,
    lastSuccessAt: lastSuccess?.runAt ?? null,
    failedRuns24h: day?.failed ?? 0,
    runs24h: day?.runs ?? 0,
  }
}
