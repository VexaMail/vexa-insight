import { FORENSIC_DOMAIN_PAGE_LIMIT } from '@/constants/forensic'
import { getEnforcementReadiness } from '@/services/enforcement'
import { getForensicReportsForDomain } from '@/services/forensic'
import { getDomainSources, getDomainSummary } from '@/services/reports'
import { getTlsDomainFailures, getTlsDomainSummary } from '@/services/tlsrpt'
import type { DomainDetailData } from '@/types/domains'

export async function getDomainDetail(
  domainId: number,
  domainName: string,
): Promise<DomainDetailData | null> {
  try {
    const [summary, sources, enforcement] = await Promise.all([
      getDomainSummary(domainId),
      getDomainSources(domainId),
      getEnforcementReadiness(domainId),
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
      tls: {
        summary: getTlsDomainSummary(domainName),
        failures: getTlsDomainFailures(domainName),
      },
      forensic: getForensicReportsForDomain(
        domainName,
        FORENSIC_DOMAIN_PAGE_LIMIT,
      ),
      enforcement,
    }
  } catch {
    return null
  }
}
