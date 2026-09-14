import { DateRangeFilter } from '@/components/filters'
import { IpDetailPanels, IpDetailSummary } from '@/components/ips'
import { BackButton, PageContainer, PageHeader } from '@/components/shell'
import { parseDateRangeParams } from '@/lib/utils'

import { getIpDetailPageData } from '@/services/reports'
import { buildIpDateRange } from '@/utils/dates'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import type { PageProps } from './PageProps'

export const metadata: Metadata = {
  title: 'Sending Source Detail',
  description: 'Authentication health and activity for a single sending source',
}

export const dynamic = 'force-dynamic'

export default async function IpDetailPage(props: PageProps) {
  const params = await props.params
  const searchParams = await props.searchParams
  // catch-all gives ip as string[] — join preserves the single IP segment
  const rawIp = params.ip.join('/')
  const decodedIp = decodeURIComponent(rawIp)

  const { days, fromDate, toDate } = parseDateRangeParams(searchParams)
  const dateRange = buildIpDateRange(days, fromDate, toDate)

  const { data, domains, reports, logs } = await getIpDetailPageData(
    decodedIp,
    dateRange,
  )

  if (!data) return notFound()

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Sending source"
        title={<span className="font-mono break-all">{decodedIp}</span>}
        back={<BackButton href="/ips">&larr; Sources</BackButton>}
        actions={
          <Suspense
            fallback={
              <div className="bg-secondary h-9 w-[160px] animate-pulse rounded-md" />
            }
          >
            <DateRangeFilter
              currentDays={days}
              basePath={`/ips/${rawIp}`}
              from={fromDate}
              to={toDate}
            />
          </Suspense>
        }
      />

      <IpDetailSummary data={data} />

      <IpDetailPanels
        ip={decodedIp}
        dateRange={dateRange}
        domains={domains}
        reports={reports}
        logs={logs}
      />
    </PageContainer>
  )
}
