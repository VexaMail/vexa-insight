import { getAllowedDomainIds } from '@/services/auth'
import type { IpDateRange } from '@/types/filters'
import type { IpSourceRow } from '@/types/ips'
import { classifySourceCause } from '@/utils/ips'
import { classifySender } from '@/utils/senders'
import { getDomainSourceDkimDomains } from './getDomainSourceDkimDomains'
import { ipsSummaryFilter } from './ipsSummaryFilter'
import { queryIpsSummaryRows } from './queryIpsSummaryRows'
import { toIpSummaryData } from './toIpSummaryData'

/**
 * Every source that sent inside the range, with the service the senders
 * catalog names for it and why it passes or fails DMARC.
 */
export async function getIpSources(
  dateRange?: IpDateRange,
): Promise<IpSourceRow[]> {
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return []

  const [rows, dkimDomainsByIp] = await Promise.all([
    queryIpsSummaryRows(allowedIds, dateRange),
    getDomainSourceDkimDomains(ipsSummaryFilter(allowedIds, dateRange)),
  ])

  return rows.map((row) => {
    const summary = toIpSummaryData(row)
    return {
      ...summary,
      sender: classifySender({
        hostname: summary.hostname,
        dkimDomains: dkimDomainsByIp.get(summary.ip) ?? [],
      }),
      cause: classifySourceCause(summary),
    }
  })
}
