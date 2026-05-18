import { insertSeedDomains } from './insertSeedDomains'
import { insertSeedEvents } from './insertSeedEvents'
import { insertSeedIp } from './insertSeedIp'
import { insertSeedReport } from './insertSeedReport'
import type { SeedDomainsSummaryConfig } from './SeedDomainsSummaryConfig'
import type { SeedDomainsSummaryResult } from './SeedDomainsSummaryResult'

/**
 * Inserts a deterministic fixture of domains/reports/events for tests that need
 * to exercise per-domain aggregate queries (e.g. getDomainsSummaryAll).
 */
export function seedDomainsSummaryFixture(
  config: SeedDomainsSummaryConfig,
): SeedDomainsSummaryResult {
  const { domainCount, reportsPerDomain, eventsPerReport, beginUnix, endUnix, now } =
    config

  const domainIds = insertSeedDomains(domainCount, now)
  const ipId = insertSeedIp(now)

  for (const [dIndex, domainId] of domainIds.entries()) {
    for (let r = 0; r < reportsPerDomain; r++) {
      const rawReportId = insertSeedReport({
        domainIndex: dIndex,
        reportIndex: r,
        beginUnix,
        endUnix,
        now,
      })
      insertSeedEvents({
        rawReportId,
        domainId,
        ipId,
        eventsPerReport,
        beginUnix,
        endUnix,
        now,
      })
    }
  }

  return { domainIds, ipId }
}
