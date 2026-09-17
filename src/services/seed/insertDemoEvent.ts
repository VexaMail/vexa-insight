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
  const { source } = input
  const spfPass = randomChance(source.spfPassRate)
  const dkimPass = randomChance(source.dkimPassRate)
  const spfAligned = spfPass && randomChance(source.alignmentRate)
  const dkimAligned = dkimPass && randomChance(source.alignmentRate)
  // DMARC passes on one aligned identifier, so only a message that aligns on
  // neither can be acted on. Picking a disposition at random instead produced
  // rejected mail with SPF and DKIM both passing.
  const dmarcPass = spfAligned || dkimAligned
  const count = Math.max(
    1,
    Math.round(randomIntInRange(1, 500) * source.volumeWeight),
  )
  getDb()
    .insert(normalizedEvents)
    .values({
      rawReportId: input.rawReportId,
      domainId: input.domainId,
      ipAddressId: input.ipId,
      spfResult: spfPass ? 'pass' : 'fail',
      dkimResult: dkimPass ? 'pass' : 'fail',
      spfAuthResult: pickRandom(AUTH_RESULTS),
      spfAligned,
      dkimAligned,
      disposition: dmarcPass ? 'none' : pickRandom(DISPOSITIONS),
      count,
      reportBeginDate: input.reportBeginDate,
      reportEndDate: input.reportEndDate,
      createdAt: input.now,
    })
    .run()
  return { count, passed: spfPass || dkimPass }
}
