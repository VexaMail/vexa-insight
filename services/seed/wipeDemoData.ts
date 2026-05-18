import { getDb, normalizedEvents, rawReports } from '@/lib/db'
import { inArray, like } from 'drizzle-orm'
import { DEMO_REPORT_PREFIX } from './demoReportPrefix'

export async function wipeDemoData(): Promise<void> {
  const db = getDb()
  const demoReportIds = db
    .select({ id: rawReports.id })
    .from(rawReports)
    .where(like(rawReports.reportId, `${DEMO_REPORT_PREFIX}%`))
    .all()
    .map((row) => row.id)
  if (demoReportIds.length > 0) {
    db.delete(normalizedEvents)
      .where(inArray(normalizedEvents.rawReportId, demoReportIds))
      .run()
  }
  db.delete(rawReports)
    .where(like(rawReports.reportId, `${DEMO_REPORT_PREFIX}%`))
    .run()
}
