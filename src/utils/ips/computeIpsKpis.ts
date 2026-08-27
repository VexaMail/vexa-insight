import type { IpSummaryData } from '@/types/IpSummaryData'
import type { IpsKpis } from '@/types/IpsKpis'
import { getAuthHealthStatus } from './getAuthHealthStatus'

export function computeIpsKpis(ips: IpSummaryData[]): IpsKpis {
  let healthySources = 0
  let needsReviewSources = 0
  let totalMessages = 0

  for (const ip of ips) {
    totalMessages += ip.totalMessages
    const status = getAuthHealthStatus(ip.fullyAlignedRate)
    if (status === 'healthy') healthySources++
    else needsReviewSources++
  }

  return {
    totalSources: ips.length,
    healthySources,
    needsReviewSources,
    totalMessages,
  }
}
