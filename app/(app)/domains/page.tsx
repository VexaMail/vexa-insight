import type { Metadata } from 'next'

import { DomainsTable } from '@/components/domains'
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
    <div className="mx-auto max-w-7xl space-y-6">
      <Suspense
        fallback={<div className="glass-card bg-muted/20 animate-pulse p-8" />}
      >
        <DomainsTable domains={summary.domains} />
      </Suspense>
    </div>
  )
}
