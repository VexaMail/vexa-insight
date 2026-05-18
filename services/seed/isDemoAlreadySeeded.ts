import { getDb, rawReports } from '@/lib/db'
import { like } from 'drizzle-orm'
import { DEMO_REPORT_PREFIX } from './demoReportPrefix'

export function isDemoAlreadySeeded(): boolean {
  const db = getDb()
  const row = db
    .select({ id: rawReports.id })
    .from(rawReports)
    .where(like(rawReports.reportId, `${DEMO_REPORT_PREFIX}%`))
    .limit(1)
    .get()
  return row !== undefined
}
