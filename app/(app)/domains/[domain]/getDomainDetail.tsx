import { DAILY_VOLUME_DAYS } from '@/constants/domains'
import { ENFORCEMENT_WINDOW_DAYS } from '@/constants/enforcement'
import { FORENSIC_DOMAIN_PAGE_LIMIT } from '@/constants/forensic'
import {
  getComplianceTrend,
  getDailyVolume,
  getPublishedPolicies,
} from '@/services/domains'
import { getEnforcementReadiness } from '@/services/enforcement'
import { getForensicReportsForDomain } from '@/services/forensic'
import { getDomainSummary } from '@/services/reports'
import { getTlsDomainFailures, getTlsDomainSummary } from '@/services/tlsrpt'
import type { DomainDetailData } from '@/types/domains'
import { buildDomainInsights } from '@/utils/domains'
import { loadSourceRows } from './loadSourceRows'

export async function getDomainDetail(
  domainId: number,
  domainName: string,
  sourceDays: number | undefined,
): Promise<DomainDetailData | null> {
  try {
    const volume = getDailyVolume([domainId], DAILY_VOLUME_DAYS)
    const [summary, allSources, windowSources, enforcement, policies, trend] =
      await Promise.all([
        getDomainSummary(domainId),
        loadSourceRows(domainId),
        sourceDays == null ? null : loadSourceRows(domainId, sourceDays),
        getEnforcementReadiness(domainId),
        getPublishedPolicies([domainId]),
        getComplianceTrend(domainId, ENFORCEMENT_WINDOW_DAYS),
      ])
    const dailyVolume = await volume
    if (!summary) return null
    return {
      summary,
      policy: policies.get(domainId) ?? null,
      trend,
      insights: buildDomainInsights(allSources),
      dailyVolume,
      sources: windowSources ?? allSources,
      sourceDays,
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
