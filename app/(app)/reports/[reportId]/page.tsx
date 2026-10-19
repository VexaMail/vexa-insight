import type { Metadata } from 'next'

import { AiReportInsightsPanel } from '@/components/ai'
import {
  AuthenticationSummary,
  ReportEntityHeader,
  ReportEvidenceSections,
  ReportKpiTiles,
  ReportSourcesPanel,
} from '@/components/reports'
import { PageContainer } from '@/components/shell'
import { Navigator } from '@/components/ui'
import { isAiConfigured } from '@/services/ai'
import {
  getReportById,
  getReportSources,
  getReportStats,
} from '@/services/reports'
import { countDistinctSourceIps, resolveReportBackLink } from '@/utils/reports'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ reportId: string }>
}): Promise<Metadata> {
  return { title: `Report ${(await params).reportId}` }
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

  const back = resolveReportBackLink(fromDomain)

  const aiConfigured = isAiConfigured()
  const hasEvents = stats.totalMessages > 0

  return (
    <PageContainer className="space-y-6">
      <ReportEntityHeader
        report={report}
        stats={stats}
        backHref={back.href}
        backLabel={back.label}
        navigatorSlot={<Navigator currentId={segment} basePath="/reports" />}
      />

      <ReportKpiTiles
        stats={stats}
        sourceCount={countDistinctSourceIps(sources)}
      />

      <AuthenticationSummary stats={stats} sources={sources} />

      <ReportSourcesPanel sources={sources} />

      <AiReportInsightsPanel
        reportId={reportId}
        isAiConfigured={aiConfigured}
        hasEvents={hasEvents}
      />

      <ReportEvidenceSections report={report} />
    </PageContainer>
  )
}
