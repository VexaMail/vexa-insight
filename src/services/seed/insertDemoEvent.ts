import { getDb, normalizedEvents } from '@/lib/db'
import { AUTH_RESULTS } from './demoAuthResults'
import { DISPOSITIONS } from './demoDispositions'
import type { DemoEventInput } from './DemoEventInput'
import type { DemoEventTotals } from './DemoEventTotals'
import { pickRandom } from './pickRandom'
import { randomChance } from './randomChance'
import { randomIntInRange } from './randomIntInRange'

/** One random event row for the demo report; reports what it added. */
export function insertDemoEvent(input: DemoEventInput): DemoEventTotals {
  const spfPass = randomChance(0.85)
  const dkimPass = randomChance(0.78)
  const count = randomIntInRange(1, 500)
  getDb()
    .insert(normalizedEvents)
    .values({
      rawReportId: input.rawReportId,
      domainId: input.domainId,
      ipAddressId: input.ipId,
      spfResult: spfPass ? 'pass' : 'fail',
      dkimResult: dkimPass ? 'pass' : 'fail',
      spfAuthResult: pickRandom(AUTH_RESULTS),
      spfAligned: spfPass && randomChance(0.9),
      dkimAligned: dkimPass && randomChance(0.9),
      disposition: pickRandom(DISPOSITIONS),
      count,
      reportBeginDate: input.reportBeginDate,
      reportEndDate: input.reportEndDate,
      createdAt: input.now,
    })
    .run()
  return { count, passed: spfPass || dkimPass }
}
