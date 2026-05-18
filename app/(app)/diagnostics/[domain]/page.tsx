import { AiDiagnosticsInsightsPanel } from '@/components/ai'
import { DiagnosticsView } from '@/components/diagnostics'
import { PageContainer } from '@/components/shell'
import { parseDateRangeParams } from '@/lib/utils'
import { isAiConfigured } from '@/services/ai'
import {
  buildDiagnosticsAdminGuides,
  computeDomainScore,
  getDiagnosticStats,
  getDomainDnsRecords,
} from '@/services/diagnostics'
import { getDomainByName, getDomainsSummaryAll } from '@/services/reports'
import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<{ domain: string }>
}): Promise<Metadata> {
  const { domain } = await params
  return { title: `Diagnostics – ${domain} | Vexa Insight` }
}

export default async function DomainDiagnosticsPage({
  params,
  searchParams,
}: {
  readonly params: Promise<{ domain: string }>
  readonly searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}) {
  const { domain: domainName } = await params
  const sp = await searchParams
  const { days, fromDate, toDate } = parseDateRangeParams(sp)

  let queryFromDate = fromDate
  let queryToDate = toDate
  if (!queryFromDate && !queryToDate && days < 9999) {
    const now = new Date()
    queryToDate = now
    queryFromDate = new Date(now)
    queryFromDate.setDate(queryFromDate.getDate() - days)
  }

  // Resolve domain by name
  const domainRow = await getDomainByName(domainName)
  if (!domainRow) notFound()

  // Parallel server-side data fetching
  const [summaryResponse, stats, dns] = await Promise.all([
    getDomainsSummaryAll(queryFromDate, queryToDate),
    getDiagnosticStats({
      domainId: domainRow.id,
      startDate: queryFromDate,
      endDate: queryToDate,
    }),
    getDomainDnsRecords(domainName),
  ])

  const mappedDomains = summaryResponse.domains.map((d) => ({
    id: d.domainId,
    name: d.domainName,
  }))

  const score = computeDomainScore(dns)
  const guides = buildDiagnosticsAdminGuides(dns, stats, score)

  const aiConfigured = isAiConfigured()

  return (
    <PageContainer>
      <DiagnosticsView
        domains={mappedDomains}
        currentDomainName={domainName}
        days={days}
        fromDate={fromDate}
        toDate={toDate}
        dns={dns}
        score={score}
      />
      <AiDiagnosticsInsightsPanel
        domainName={domainName}
        domainId={domainRow.id}
        isAiConfigured={aiConfigured}
        score={score}
        stats={stats}
        guides={guides}
        startDate={queryFromDate?.toISOString()}
        endDate={queryToDate?.toISOString()}
      />
    </PageContainer>
  )
}
