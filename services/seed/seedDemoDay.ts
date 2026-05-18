import { getDb, normalizedEvents, rawReports } from '@/lib/db'
import { AUTH_RESULTS } from './demoAuthResults'
import { DISPOSITIONS } from './demoDispositions'
import { REPORTING_ORGS } from './demoReportingOrgs'
import { DEMO_REPORT_PREFIX } from './demoReportPrefix'
import { pickRandom } from './pickRandom'
import { randomChance } from './randomChance'
import { randomIntInRange } from './randomIntInRange'
import type { SeedDemoDayArgs } from './SeedDemoDayArgs'
import type { SeedDemoDayResult } from './SeedDemoDayResult'

export async function seedDemoDay({
  dayStart,
  dayEnd,
  domainName,
  domainId,
  ipIds,
  now,
}: SeedDemoDayArgs): Promise<SeedDemoDayResult> {
  const db = getDb()
  const reportId = `${DEMO_REPORT_PREFIX}${domainName}-${dayStart
    .toISOString()
    .slice(0, 10)}`
  const inserted = db
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
    })
    .returning({ id: rawReports.id })
    .get()

  const eventCount = randomIntInRange(8, 18)
  let eventsInserted = 0
  for (let e = 0; e < eventCount; e++) {
    const ipId = pickRandom(ipIds)
    const spfPass = randomChance(0.85)
    const dkimPass = randomChance(0.78)
    db.insert(normalizedEvents)
      .values({
        rawReportId: inserted.id,
        domainId,
        ipAddressId: ipId,
        spfResult: spfPass ? 'pass' : 'fail',
        dkimResult: dkimPass ? 'pass' : 'fail',
        spfAuthResult: pickRandom(AUTH_RESULTS),
        spfAligned: spfPass && randomChance(0.9),
        dkimAligned: dkimPass && randomChance(0.9),
        disposition: pickRandom(DISPOSITIONS),
        count: randomIntInRange(1, 500),
        reportBeginDate: Math.floor(dayStart.getTime() / 1000),
        reportEndDate: Math.floor(dayEnd.getTime() / 1000),
        createdAt: now,
      })
      .run()
    eventsInserted += 1
  }
  return { rawReports: 1, events: eventsInserted }
}
