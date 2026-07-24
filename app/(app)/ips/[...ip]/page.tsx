import { DateRangeFilter } from '@/components/filters'
import {
  IpDetailSummary,
  IpEventLogs,
  IpRelatedDomains,
  IpRelatedReports,
} from '@/components/ips'
import { BackButton, PageContainer, PageHeader } from '@/components/shell'
import { InlineErrorBlock } from '@/components/ui'
import { parseDateRangeParams } from '@/lib/utils'

import { getIpDetailPageData } from '@/services/reports'
import type { IpDateRange } from '@/types/filters'
import { getFromDateFromDays } from '@/utils/dates'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import type { PageProps } from './PageProps'

export const metadata: Metadata = {
  title: 'Sending Source Detail | Vexa Insight',
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
  const now = new Date()
  const derivedFromDate =
    fromDate ??
    (days && days !== 9999 ? getFromDateFromDays(now, days) : undefined)

  let fromTs: number | undefined
  if (fromDate) {
    fromTs = Math.floor(fromDate.getTime() / 1000)
  } else if (days && days !== 9999) {
    fromTs = Math.floor((derivedFromDate ?? now).getTime() / 1000)
  }

  const dateRange: IpDateRange = {
    fromDate,
    toDate,
    fromTs,
    toTs: toDate ? Math.floor(toDate.getTime() / 1000) : undefined,
    hasDateFilter: fromTs != null || toDate != null,
  }

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

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full space-y-6 lg:w-1/3">
          {domains ? (
            <IpRelatedDomains
              initialDomains={domains}
              ip={decodedIp}
              dateRange={dateRange}
            />
          ) : (
            <InlineErrorBlock>
              Related domains section is temporarily unavailable.
            </InlineErrorBlock>
          )}

          {reports ? (
            <IpRelatedReports
              initialReports={reports}
              ip={decodedIp}
              dateRange={dateRange}
            />
          ) : (
            <InlineErrorBlock>
              Related reports section is temporarily unavailable.
            </InlineErrorBlock>
          )}
        </div>

        <div className="w-full space-y-6 lg:w-2/3">
          {logs ? (
            <IpEventLogs
              initialLogs={logs}
              ip={decodedIp}
              dateRange={dateRange}
            />
          ) : (
            <InlineErrorBlock>
              Available logs section is temporarily unavailable.
            </InlineErrorBlock>
          )}
        </div>
      </div>
    </PageContainer>
  )
}
