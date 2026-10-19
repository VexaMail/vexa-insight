import { PageContainer, PageHeader } from '@/components/shell'
import { PageSkeleton } from '@/components/ui'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { DiagnosticsOverviewLoader } from './DiagnosticsOverviewLoader'

export const metadata: Metadata = {
  title: 'Diagnostics',
}

export const dynamic = 'force-dynamic'

/**
 * /diagnostics — every domain's score and protocol states from a DNS run,
 * streamed in once the lookups finish.
 */
export default function DiagnosticsIndexPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Diagnostics"
        description="DNS checks of DMARC, SPF, DKIM, MTA-STS, TLS-RPT and BIMI for every domain in your reports. Open a domain for its findings and fixes."
      />
      <Suspense fallback={<PageSkeleton className="h-96" />}>
        <DiagnosticsOverviewLoader />
      </Suspense>
    </PageContainer>
  )
}
