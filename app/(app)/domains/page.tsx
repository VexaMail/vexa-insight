import type { Metadata } from 'next'

import { DomainsKpiStrip, DomainsTable } from '@/components/domains'
import { PageContainer, PageHeader } from '@/components/shell'
import { PageSkeleton } from '@/components/ui'
import { REPORT_STALE_DAYS } from '@/constants/gaps'
import { getPublishedPolicies } from '@/services/domains'
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
  const policies = await getPublishedPolicies(
    summary.domains.map((d) => d.domainId),
  )
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
      />
      <Suspense fallback={<PageSkeleton />}>
        <DomainsTable domains={rows} />
      </Suspense>
    </PageContainer>
  )
}
