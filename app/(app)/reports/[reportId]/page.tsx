import type { Metadata } from 'next'

import { ReportDetailView } from '@/components/reports'
import { PageContainer } from '@/components/shell'
import { isAiConfigured } from '@/services/ai'
import { getReportDetailData } from '@/services/reports'
import { parseReportTab } from '@/utils/reports'
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
  const query = await searchParams

  const reportId = Number.parseInt(segment, 10)
  if (!Number.isInteger(reportId) || reportId < 1) {
    notFound()
  }

  const data = await getReportDetailData(reportId)
  if (!data) notFound()

  return (
    <PageContainer className="space-y-6">
      <ReportDetailView
        data={data}
        tab={parseReportTab(query['tab'])}
        fromDomain={
          typeof query['fromDomain'] === 'string'
            ? query['fromDomain']
            : undefined
        }
        isAiConfigured={isAiConfigured()}
      />
    </PageContainer>
  )
}
