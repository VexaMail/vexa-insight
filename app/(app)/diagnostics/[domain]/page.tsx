import { AiDiagnosticsInsightsPanel } from '@/components/ai'
import { DiagnosticsView } from '@/components/diagnostics'
import { PageContainer } from '@/components/shell'
import { parseDateRangeParams } from '@/lib/utils'
import { isAiConfigured } from '@/services/ai'
import { loadDomainDiagnostics } from '@/services/diagnostics'
import { getDomainByName } from '@/services/reports'
import { resolveDiagnosticsQueryWindow } from '@/utils/diagnostics'
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
  const window = resolveDiagnosticsQueryWindow(days, fromDate, toDate)

  const domainRow = await getDomainByName(domainName)
  if (!domainRow) notFound()

  const data = await loadDomainDiagnostics(domainRow.id, domainName, window)

  return (
    <PageContainer>
      <DiagnosticsView
        domains={data.domains}
        currentDomainName={domainName}
        days={days}
        fromDate={fromDate}
        toDate={toDate}
        dns={data.dns}
        score={data.score}
      />
      <AiDiagnosticsInsightsPanel
        domainName={domainName}
        domainId={domainRow.id}
        isAiConfigured={isAiConfigured()}
        score={data.score}
        stats={data.stats}
        guides={data.guides}
        startDate={window.queryFromDate?.toISOString()}
        endDate={window.queryToDate?.toISOString()}
      />
    </PageContainer>
  )
}
