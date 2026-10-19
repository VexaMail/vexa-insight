import { PageContainer, PageHeader } from '@/components/shell'
import { LoadingPanel } from '@/components/ui'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { DiagnosticsOverviewLoader } from './DiagnosticsOverviewLoader'

export const metadata: Metadata = {
  title: 'Diagnostics',
}

export const dynamic = 'force-dynamic'

/**
 * /diagnostics — every domain's score and protocol states from its stored DNS
 * run; stale rows are checked again from the browser and fill in as they
 * finish.
 */
export default function DiagnosticsIndexPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Diagnostics"
        description="DNS checks of DMARC, SPF, DKIM, MTA-STS, TLS-RPT and BIMI for every domain in your reports. Open a domain for its findings and fixes."
      />
      <Suspense
        fallback={
          <LoadingPanel className="min-h-96">Loading domains…</LoadingPanel>
        }
      >
        <DiagnosticsOverviewLoader />
      </Suspense>
    </PageContainer>
  )
}
