import type { getDb } from '@/lib/db'
import { rawReports } from '@/lib/db'
import { eq } from 'drizzle-orm'

/**
 * Cheap pre-check for the idempotent ingest: true when a raw report with this
 * report_id is already stored. The insert inside the transaction still guards
 * the race where two ingests of the same report both pass this read.
 */
export function hasRawReport(
  db: ReturnType<typeof getDb>,
  reportId: string,
): boolean {
  const existing = db
    .select({ id: rawReports.id })
    .from(rawReports)
    .where(eq(rawReports.reportId, reportId))
    .limit(1)
    .get()
  return existing !== undefined
}
