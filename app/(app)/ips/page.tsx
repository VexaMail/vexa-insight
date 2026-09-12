import { DateRangeFilter } from '@/components/filters'
import { IpsSummaryKpis, IpsTable } from '@/components/ips'
import { PageContainer, PageHeader } from '@/components/shell'
import { PageSkeleton } from '@/components/ui'
import { parseDateRangeParams } from '@/lib/utils'
import { getIpsSummary } from '@/services/reports'
import type { IpDateRange } from '@/types/filters'
import { getFromDateFromDays } from '@/utils/dates'
import { computeIpsKpis } from '@/utils/ips'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import type { PageProps } from './PageProps'

export const metadata: Metadata = {
  title: 'Sending Sources',
  description:
    'IP addresses sending email on behalf of your domains, based on DMARC aggregate reports',
}

export const dynamic = 'force-dynamic'

export default async function IpsPage(props: PageProps) {
  const searchParams = await props.searchParams
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

  const summary = await getIpsSummary(dateRange)
  const kpis = computeIpsKpis(summary.ips)

  return (
    <PageContainer>
      <PageHeader
        title="Sending Sources"
        description="IP addresses that sent email claiming to be from your domains, based on DMARC aggregate reports. Review authentication health to identify trusted and potentially unauthorized sources."
        actions={
          <Suspense
            fallback={
              <div className="bg-secondary h-9 w-[160px] animate-pulse rounded-md" />
            }
          >
            <DateRangeFilter
              currentDays={days}
              basePath="/ips"
              from={fromDate}
              to={toDate}
            />
          </Suspense>
        }
      />
      <IpsSummaryKpis kpis={kpis} />
      <Suspense fallback={<PageSkeleton />}>
        <IpsTable ips={summary.ips} />
      </Suspense>
    </PageContainer>
  )
}
