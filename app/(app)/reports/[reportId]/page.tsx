import type { Metadata } from 'next'

import { AiReportInsightsPanel } from '@/components/ai'
import {
  AuthenticationSummary,
  ReportHeader,
  ReportKpiCards,
  ReportMetadata,
  ReportSourcesTable,
  ReportTransportSecurityPrimer,
  XmlViewerCollapsible,
} from '@/components/reports'
import { PageContainer } from '@/components/shell'
import { Navigator } from '@/components/ui'
import { isAiConfigured } from '@/services/ai'
import {
  getReportById,
  getReportSources,
  getReportStats,
} from '@/services/reports'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ reportId: string }>
}): Promise<Metadata> {
  return { title: `Report ${(await params).reportId} | Vexa Insight` }
}

export default async function ReportDetailPage({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ reportId: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}>) {
  const { reportId: segment } = await params
  const { fromDomain } = await searchParams

  const reportId = Number.parseInt(segment, 10)
  if (!Number.isInteger(reportId) || reportId < 1) {
    notFound()
  }

  const [report, stats, sources] = await Promise.all([
    getReportById(reportId),
    getReportStats(reportId),
    getReportSources(reportId),
  ])
  if (!report) notFound()

  const backHref =
    typeof fromDomain === 'string' && fromDomain.length > 0
      ? `/domains/${encodeURIComponent(fromDomain)}`
      : '/reports'
  const backLabel = fromDomain ? <>&larr; Domain Info</> : <>&larr; Reports</>

  const aiConfigured = isAiConfigured()
  const hasEvents = stats.totalMessages > 0

  return (
    <PageContainer>
      <ReportHeader
        report={report}
        backHref={backHref}
        backLabel={backLabel}
        navigatorSlot={<Navigator currentId={segment} basePath="/reports" />}
      />

      <ReportKpiCards stats={stats} />

      <AuthenticationSummary stats={stats} sources={sources} />

      <ReportSourcesTable sources={sources} />

      <ReportTransportSecurityPrimer
        domainHints={report.relatedDomains?.map((d) => d.domainName) ?? []}
      />

      <AiReportInsightsPanel
        reportId={reportId}
        isAiConfigured={aiConfigured}
        hasEvents={hasEvents}
      />

      <ReportMetadata report={report} />

      <XmlViewerCollapsible rawXml={report.rawXml} />
    </PageContainer>
  )
}
