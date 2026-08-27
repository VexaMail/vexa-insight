import { eventRollupDaily, getDb, normalizedEvents, rawReports } from '@/lib/db'
import { DAY_SECONDS } from '@/utils/dates'
import { sql } from 'drizzle-orm'
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

  const reportEndDate = Math.floor(dayEnd.getTime() / 1000)
  const eventCount = randomIntInRange(8, 18)
  let eventsInserted = 0
  let dayTotal = 0
  let dayPassed = 0
  for (let e = 0; e < eventCount; e++) {
    const ipId = pickRandom(ipIds)
    const spfPass = randomChance(0.85)
    const dkimPass = randomChance(0.78)
    const count = randomIntInRange(1, 500)
    dayTotal += count
    if (spfPass || dkimPass) dayPassed += count
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
        count,
        reportBeginDate: Math.floor(dayStart.getTime() / 1000),
        reportEndDate,
        createdAt: now,
      })
      .run()
    eventsInserted += 1
  }

  // Maintain the derived rollup inline so the seed does not depend on the
  // reports barrel (which would pull top-level-await modules into the tsx
  // seed script). All events here share one report end date -> one day bucket.
  db.insert(eventRollupDaily)
    .values({
      domainId,
      day: Math.floor(reportEndDate / DAY_SECONDS),
      totalCount: dayTotal,
      passedCount: dayPassed,
    })
    .onConflictDoUpdate({
      target: [eventRollupDaily.domainId, eventRollupDaily.day],
      set: {
        totalCount: sql`${eventRollupDaily.totalCount} + ${dayTotal}`,
        passedCount: sql`${eventRollupDaily.passedCount} + ${dayPassed}`,
      },
    })
    .run()

  return { rawReports: 1, events: eventsInserted }
}
