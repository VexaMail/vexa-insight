import type { Metadata } from 'next'

import { DomainsKpiStrip, DomainsTable } from '@/components/domains'
import { PageContainer, PageHeader } from '@/components/shell'
import { PageSkeleton } from '@/components/ui'
import { DAILY_VOLUME_DAYS } from '@/constants/domains'
import { REPORT_STALE_DAYS } from '@/constants/gaps'
import { getDailyVolume, getPublishedPolicies } from '@/services/domains'
import { getDomainsSummaryAll } from '@/services/reports'
import { buildDomainsKpis, withPublishedPolicies } from '@/utils/domains'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Domains',
  description: 'DMARC Domains',
}

export const dynamic = 'force-dynamic'

export default async function DomainsPage() {
  const summary = await getDomainsSummaryAll()
  const ids = summary.domains.map((d) => d.domainId)
  const [policies, dailyVolume] = await Promise.all([
    getPublishedPolicies(ids),
    getDailyVolume(ids, DAILY_VOLUME_DAYS),
  ])
  const rows = withPublishedPolicies(summary.domains, policies)

  return (
    <PageContainer>
      <PageHeader
        title="Domains"
        description="Every domain the aggregate reports mention, with its DMARC pass rate over all reports and the policy the latest report quoted."
      />
      <DomainsKpiStrip
        kpis={buildDomainsKpis(rows)}
        staleDays={REPORT_STALE_DAYS}
        dailyVolume={dailyVolume}
      />
      <Suspense fallback={<PageSkeleton />}>
        <DomainsTable domains={rows} />
      </Suspense>
    </PageContainer>
  )
}
