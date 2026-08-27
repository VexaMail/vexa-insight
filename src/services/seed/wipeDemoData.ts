import { eventRollupDaily, getDb, normalizedEvents, rawReports } from '@/lib/db'
import { inArray, like } from 'drizzle-orm'
import { DEMO_REPORT_PREFIX } from './demoReportPrefix'

export function wipeDemoData(): void {
  const db = getDb()
  const demoReportIds = db
    .select({ id: rawReports.id })
    .from(rawReports)
    .where(like(rawReports.reportId, `${DEMO_REPORT_PREFIX}%`))
    .all()
    .map((row) => row.id)
  if (demoReportIds.length > 0) {
    // Capture the demo domains before deleting events so their derived rollup
    // rows can be cleared too; otherwise a force-reseed would double-count via
    // the additive upsert in seedDemoDay. Demo domains are isolated by prefix,
    // so dropping their rollup rows does not affect real ingested data.
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
  db.delete(rawReports)
    .where(like(rawReports.reportId, `${DEMO_REPORT_PREFIX}%`))
    .run()
}
