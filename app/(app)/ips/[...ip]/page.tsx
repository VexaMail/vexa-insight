import { DateRangeFilter } from '@/components/filters'
import { IpDetailView, SndsReputationCard } from '@/components/ips'
import { BackButton, PageContainer } from '@/components/shell'
import { parseDateRangeParams } from '@/lib/utils'
import { getIpDetailPageData } from '@/services/reports'
import { listSndsLatestByIp } from '@/services/snds'
import { buildIpDateRange } from '@/utils/dates'
import { buildIpDetailContext, parseIpDetailTab } from '@/utils/ips'
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
  const ip = decodeURIComponent(rawIp)
  const { days, fromDate, toDate } = parseDateRangeParams(searchParams)
  const dateRange = buildIpDateRange(days, fromDate, toDate)

  const { data, ...loaded } = await getIpDetailPageData(ip, dateRange)
  if (!data) return notFound()

  const basePath = `/ips/${rawIp}`
  const ctx = buildIpDetailContext({
    ip,
    basePath,
    searchParams,
    dateRange,
    data,
    ...loaded,
  })
  const sndsRows = listSndsLatestByIp().filter((row) => row.ip === ip)

  return (
    <PageContainer>
      <IpDetailView
        ctx={ctx}
        tab={parseIpDetailTab(searchParams['tab'])}
        actions={
          <>
            <BackButton href="/ips">&larr; Sources</BackButton>
            <Suspense
              fallback={
                <div className="bg-secondary h-9 w-[160px] animate-pulse rounded-md" />
              }
            >
              <DateRangeFilter
                currentDays={days}
                basePath={basePath}
                from={fromDate}
                to={toDate}
              />
            </Suspense>
          </>
        }
      />
      {sndsRows.length > 0 ? (
        <SndsReputationCard rows={sndsRows} statusRows={[]} />
      ) : null}
    </PageContainer>
  )
}
