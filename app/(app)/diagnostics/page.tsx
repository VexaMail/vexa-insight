import { PageContainer, PageHeader } from '@/components/shell'
import { EmptyState } from '@/components/ui'
import { getDomainsSummaryAll } from '@/services/reports'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Diagnostics | Vexa Insight',
}

export const dynamic = 'force-dynamic'

/**
 * /diagnostics — redirects to the first available domain's diagnostics page,
 * or shows an empty state if no domains exist.
 */
export default async function DiagnosticsIndexPage() {
  const summaryResponse = await getDomainsSummaryAll()
  const domains = summaryResponse.domains

  if (domains.length === 0) {
    return (
      <PageContainer>
        <PageHeader title="Diagnostics" />
        <EmptyState>No domains found with DMARC reports.</EmptyState>
      </PageContainer>
    )
  }

  redirect(`/diagnostics/${domains[0]?.domainName ?? ''}`)
}
