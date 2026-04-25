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
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h1 className="font-display text-foreground text-2xl font-bold tracking-tight">
            Diagnostics
          </h1>
        </div>
        <div className="bg-card text-muted-foreground rounded-lg border p-8 text-center shadow-sm">
          No domains found with DMARC reports.
        </div>
      </div>
    )
  }

  redirect(`/diagnostics/${domains[0]?.domainName ?? ''}`)
}
