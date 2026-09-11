import { eventRollupDaily, getDb, normalizedEvents, rawReports } from '@/lib/db'
import { eq, inArray } from 'drizzle-orm'

/**
 * Deletes every report the seeder wrote, and nothing else.
 *
 * The selector is `raw_reports.is_demo`, set at insert time. It used to be
 * `report_id LIKE 'demo-%'`, and a report id is written by the reporting
 * organisation: a genuine aggregate report whose id happened to begin `demo-`
 * was deleted here along with its events and its domain's rollup rows.
 */
export function wipeDemoData(): void {
  const db = getDb()
  const demoReportIds = db
    .select({ id: rawReports.id })
    .from(rawReports)
    .where(eq(rawReports.isDemo, true))
    .all()
    .map((row) => row.id)
  if (demoReportIds.length > 0) {
    // Capture the demo domains before deleting events so their derived rollup
    // rows can be cleared too; otherwise a force-reseed would double-count via
    // the additive upsert in seedDemoDay. Demo domains are the seeder's own, so
    // dropping their rollup rows does not affect real ingested data.
    const demoDomainIds = [
      ...new Set(
        db
          .select({ id: normalizedEvents.domainId })
          .from(normalizedEvents)
          .where(inArray(normalizedEvents.rawReportId, demoReportIds))
          .all()
          .map((row) => row.id),
      ),
    ]
    db.delete(normalizedEvents)
      .where(inArray(normalizedEvents.rawReportId, demoReportIds))
      .run()
    if (demoDomainIds.length > 0) {
      db.delete(eventRollupDaily)
        .where(inArray(eventRollupDaily.domainId, demoDomainIds))
        .run()
    }
  }
  db.delete(rawReports).where(eq(rawReports.isDemo, true)).run()
}
