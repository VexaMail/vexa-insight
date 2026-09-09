import { insertDemoEvent } from './insertDemoEvent'
import { insertDemoRawReport } from './insertDemoRawReport'
import { pickRandom } from './pickRandom'
import { randomIntInRange } from './randomIntInRange'
import type { SeedDemoDayArgs } from './SeedDemoDayArgs'
import type { SeedDemoDayResult } from './SeedDemoDayResult'
import { upsertDemoRollup } from './upsertDemoRollup'

export function seedDemoDay(args: SeedDemoDayArgs): SeedDemoDayResult {
  const { dayStart, dayEnd, domainId, ipIds, now } = args
  const rawReportId = insertDemoRawReport(args)

  const reportBeginDate = Math.floor(dayStart.getTime() / 1000)
  const reportEndDate = Math.floor(dayEnd.getTime() / 1000)
  const eventCount = randomIntInRange(8, 18)
  let eventsInserted = 0
  let dayTotal = 0
  let dayPassed = 0
  for (let e = 0; e < eventCount; e++) {
    const ipId = pickRandom(ipIds)
    const event = insertDemoEvent({
      rawReportId,
      domainId,
      ipId,
      reportBeginDate,
      reportEndDate,
      now,
    })
    dayTotal += event.count
    if (event.passed) dayPassed += event.count
    eventsInserted += 1
  }

  upsertDemoRollup(domainId, reportEndDate, dayTotal, dayPassed)

  return { rawReports: 1, events: eventsInserted }
}
