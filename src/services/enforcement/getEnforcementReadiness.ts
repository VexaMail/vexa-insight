import { ENFORCEMENT_WINDOW_DAYS } from '@/constants/enforcement'
import { normalizedEvents } from '@/lib/db'
import { getDomainSourceDkimDomains } from '@/services/reports'
import type { EnforcementReadiness } from '@/types/enforcement'
import { getCutoffUnixSecondsFromDays } from '@/utils/dates'
import { computeEnforcementReadiness } from '@/utils/enforcement'
import { classifySender } from '@/utils/senders'
import { and, eq, gte } from 'drizzle-orm'
import { countReportDays } from './countReportDays'
import { getEnforcementSources } from './getEnforcementSources'

/**
 * Simulates `p=quarantine`/`p=reject` for a domain over the last
 * `ENFORCEMENT_WINDOW_DAYS` of reports: how much mail would have been stopped,
 * and whether any of it looks legitimate.
 */
export async function getEnforcementReadiness(
  domainId: number,
  days = ENFORCEMENT_WINDOW_DAYS,
): Promise<EnforcementReadiness> {
  const cutoff = getCutoffUnixSecondsFromDays(new Date(), days)
  const where = and(
    eq(normalizedEvents.domainId, domainId),
    cutoff === undefined
      ? undefined
      : gte(normalizedEvents.reportEndDate, cutoff),
  )
  const [rows, dkimDomainsByIp, reportDays] = await Promise.all([
    getEnforcementSources(where),
    getDomainSourceDkimDomains(where),
    countReportDays(where),
  ])
  const sources = rows.map((row) => ({
    ...row,
    sender: classifySender({
      hostname: row.hostname,
      dkimDomains: dkimDomainsByIp.get(row.sourceIp) ?? [],
    }),
  }))
  return computeEnforcementReadiness(sources, { days, reportDays })
}
