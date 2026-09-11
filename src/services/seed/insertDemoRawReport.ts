import { getDb, rawReports } from '@/lib/db'
import { REPORTING_ORGS } from './demoReportingOrgs'
import { DEMO_REPORT_PREFIX } from './demoReportPrefix'
import { pickRandom } from './pickRandom'
import type { SeedDemoDayArgs } from './SeedDemoDayArgs'

/** One synthetic aggregate report covering the day; returns its row id. */
export function insertDemoRawReport({
  dayStart,
  dayEnd,
  domainName,
  now,
}: SeedDemoDayArgs): number {
  const reportId = `${DEMO_REPORT_PREFIX}${domainName}-${dayStart
    .toISOString()
    .slice(0, 10)}`
  const inserted = getDb()
    .insert(rawReports)
    .values({
      reportId,
      orgName: pickRandom(REPORTING_ORGS),
      beginDate: Math.floor(dayStart.getTime() / 1000),
      endDate: Math.floor(dayEnd.getTime() / 1000),
      rawXml: `<demo>${reportId}</demo>`,
      sourceEmail: 'demo@vexamail.local',
      sourceMessageId: `demo-${reportId}`,
      ingestedAt: now,
      isDemo: true,
    })
    .returning({ id: rawReports.id })
    .get()
  return inserted.id
}
