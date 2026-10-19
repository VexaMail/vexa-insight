import type { IpDateRange } from '@/types/filters'
import { classifySender } from '@/utils/senders'
import { getIpDetail } from './getIpDetail'
import { getIpDkimSignatures } from './getIpDkimSignatures'
import { getIpDomains } from './getIpDomains'
import { getIpLogs } from './getIpLogs'
import { getIpReports } from './getIpReports'
import type { IpDetailPageData } from './IpDetailPageData'
import { settledOrNull } from './settledOrNull'

export async function getIpDetailPageData(
  ip: string,
  dateRange: IpDateRange,
): Promise<IpDetailPageData> {
  const [summaryResult, domainsResult, reportsResult, logsResult, dkimResult] =
    await Promise.allSettled([
      getIpDetail(ip, dateRange),
      getIpDomains({ ip, dateRange }),
      getIpReports(ip, dateRange),
      getIpLogs({ ip, dateRange }),
      getIpDkimSignatures(ip, dateRange),
    ])

  const data = settledOrNull(summaryResult, 'summary')
  const domains = settledOrNull(domainsResult, 'domains')
  const reports = settledOrNull(reportsResult, 'reports')
  const logs = settledOrNull(logsResult, 'logs')
  const dkimSignatures = settledOrNull(dkimResult, 'DKIM signatures') ?? []

  const sender = data
    ? classifySender({
        hostname: data.hostname,
        dkimDomains: dkimSignatures.map((sig) => sig.domain),
      })
    : null

  return { data, domains, reports, logs, dkimSignatures, sender }
}
