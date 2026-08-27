import { DAY_MS } from './dayMs'
import { DAYS_BACK } from './daysBack'
import { DEMO_DOMAINS } from './demoDomains'
import { SOURCE_IPS } from './demoSourceIps'
import { ensureDemoDomain } from './ensureDemoDomain'
import { ensureDemoIp } from './ensureDemoIp'
import { isDemoAlreadySeeded } from './isDemoAlreadySeeded'
import { refuseInProduction } from './refuseInProduction'
import type { RunSeedDemoArgs } from './RunSeedDemoArgs'
import { seedDemoDay } from './seedDemoDay'
import type { SeedSummary } from './SeedSummary'
import { wipeDemoData } from './wipeDemoData'

export function runSeedDemo({ force }: RunSeedDemoArgs): SeedSummary | null {
  refuseInProduction()

  if (isDemoAlreadySeeded() && !force) {
    console.log(
      '[seed:demo] Demo data already present. Re-run with --force to refresh.',
    )
    return null
  }
  if (force) {
    console.log('[seed:demo] --force flag set; wiping existing demo data...')
    wipeDemoData()
  }

  const summary: SeedSummary = {
    domains: 0,
    ips: 0,
    rawReports: 0,
    events: 0,
  }
  const now = new Date()

  const domainIds = DEMO_DOMAINS.map((domain) => ensureDemoDomain(domain, now))
  summary.domains = domainIds.length

  const ipIds = SOURCE_IPS.map((ip) => ensureDemoIp(ip, now))
  summary.ips = ipIds.length

  for (let day = DAYS_BACK - 1; day >= 0; day--) {
    const dayStart = new Date(now.getTime() - day * DAY_MS)
    dayStart.setUTCHours(0, 0, 0, 0)
    const dayEnd = new Date(dayStart.getTime() + DAY_MS - 1)
    for (let i = 0; i < DEMO_DOMAINS.length; i++) {
      const domainName = DEMO_DOMAINS[i]
      const domainId = domainIds[i]
      if (domainName === undefined || domainId === undefined) continue
      const result = seedDemoDay({
        dayStart,
        dayEnd,
        domainName,
        domainId,
        ipIds,
        now,
      })
      summary.rawReports += result.rawReports
      summary.events += result.events
    }
  }

  return summary
}
