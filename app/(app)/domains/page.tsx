import type { Metadata } from 'next'

import { DomainsTable } from '@/components/domains'
import { PageContainer, PageHeader } from '@/components/shell'
import { PageSkeleton } from '@/components/ui'
import { getDomainsSummaryAll } from '@/services/reports'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Domains | Vexa Insight',
  description: 'DMARC Domains',
}

export const dynamic = 'force-dynamic'

export default async function DomainsPage() {
  const summary = await getDomainsSummaryAll()

  return (
    <PageContainer>
      <PageHeader
        title="Domains"
        description="Domains observed in your DMARC aggregate reports."
      />
      <Suspense fallback={<PageSkeleton />}>
        <DomainsTable domains={summary.domains} />
      </Suspense>
    </PageContainer>
  )
}
