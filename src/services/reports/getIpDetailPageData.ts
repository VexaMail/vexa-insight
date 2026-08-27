import type { IpDateRange } from '@/types/filters'
import { getIpDetail } from './getIpDetail'
import { getIpDomains } from './getIpDomains'
import { getIpLogs } from './getIpLogs'
import { getIpReports } from './getIpReports'
import type { IpDetailPageData } from './IpDetailPageData'

export async function getIpDetailPageData(
  ip: string,
  dateRange: IpDateRange,
): Promise<IpDetailPageData> {
  const [summaryResult, domainsResult, reportsResult, logsResult] =
    await Promise.allSettled([
      getIpDetail(ip, dateRange),
      getIpDomains(ip, dateRange),
      getIpReports(ip, dateRange),
      getIpLogs(ip, dateRange),
    ])

  const data = summaryResult.status === 'fulfilled' ? summaryResult.value : null
  const domains =
    domainsResult.status === 'fulfilled' ? domainsResult.value : null
  const reports =
    reportsResult.status === 'fulfilled' ? reportsResult.value : null
  const logs = logsResult.status === 'fulfilled' ? logsResult.value : null

  if (domainsResult.status === 'rejected') {
    console.error('Failed to fetch IP domains:', domainsResult.reason)
  }
  if (reportsResult.status === 'rejected') {
    console.error('Failed to fetch IP reports:', reportsResult.reason)
  }
  if (logsResult.status === 'rejected') {
    console.error('Failed to fetch IP logs:', logsResult.reason)
  }

  return { data, domains, reports, logs }
}
