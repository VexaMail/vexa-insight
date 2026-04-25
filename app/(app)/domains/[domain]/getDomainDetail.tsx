import { getDomainSources, getDomainSummary } from '@/services/reports'
import type { DomainDetailData } from '@/types/domains'

export async function getDomainDetail(
  domainId: number,
): Promise<DomainDetailData | null> {
  try {
    const [summary, sources] = await Promise.all([
      getDomainSummary(domainId),
      getDomainSources(domainId),
    ])
    if (!summary) return null
    return {
      summary,
      stats: {
        totalMessages: summary.totalMessages,
        passedCount: summary.passedCount,
        failedCount: summary.failedCount,
        passRatePercent: summary.passRatePercent,
      },
      sources,
    }
  } catch {
    return null
  }
}
