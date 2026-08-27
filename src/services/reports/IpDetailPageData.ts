import type { getIpDetail } from './getIpDetail'
import type { getIpDomains } from './getIpDomains'
import type { getIpLogs } from './getIpLogs'
import type { getIpReports } from './getIpReports'

export type IpDetailPageData = {
  readonly data: Awaited<ReturnType<typeof getIpDetail>> | null
  readonly domains: Awaited<ReturnType<typeof getIpDomains>> | null
  readonly reports: Awaited<ReturnType<typeof getIpReports>> | null
  readonly logs: Awaited<ReturnType<typeof getIpLogs>> | null
}
