import { getDb, rawReports } from '@/lib/db'
import type { InsertSeedReportParams } from './InsertSeedReportParams'

/**
 * Inserts a seed raw_reports row with a deterministic id of the form
 * `d{domainIndex}-r{reportIndex}` and returns its generated PK.
 */
export function insertSeedReport(params: InsertSeedReportParams): number {
  const db = getDb()
  const { domainIndex, reportIndex, beginUnix, endUnix, now } = params
  const row = db
    .insert(rawReports)
    .values({
      reportId: `d${String(domainIndex)}-r${String(reportIndex)}`,
      orgName: 'test-org',
      beginDate: beginUnix,
      endDate: endUnix,
      rawXml: '<feedback/>',
      ingestedAt: now,
    })
    .returning({ id: rawReports.id })
    .all()
  const id = row[0]?.id
  if (id == null) throw new Error('insert report failed')
  return id
}
