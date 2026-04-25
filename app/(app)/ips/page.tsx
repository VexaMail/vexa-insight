import { DateRangeFilter } from '@/components/filters'
import { IpsSectionHeader, IpsSummaryKpis, IpsTable } from '@/components/ips'
import { parseDateRangeParams } from '@/lib/utils'
import { getIpsSummary } from '@/services/reports'
import type { IpDateRange } from '@/types/filters'
import { getFromDateFromDays } from '@/utils/dates'
import { computeIpsKpis } from '@/utils/ips'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import type { PageProps } from './PageProps'

export const metadata: Metadata = {
  title: 'Sending Sources | Vexa Insight',
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
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <IpsSectionHeader />
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
      </div>
      <IpsSummaryKpis kpis={kpis} />
      <Suspense
        fallback={<div className="glass-card bg-muted/20 animate-pulse p-8" />}
      >
        <IpsTable ips={summary.ips} />
      </Suspense>
    </div>
  )
}
