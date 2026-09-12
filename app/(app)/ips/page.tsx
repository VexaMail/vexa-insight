import { DateRangeFilter } from '@/components/filters'
import { IpsSummaryKpis, IpsTable, SndsReputationPanel } from '@/components/ips'
import { PageContainer, PageHeader } from '@/components/shell'
import { PageSkeleton } from '@/components/ui'
import { parseDateRangeParams } from '@/lib/utils'
import { getIpsSummary } from '@/services/reports'
import { getSndsReputationPanel } from '@/services/snds'
import { buildIpDateRange } from '@/utils/dates'
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

  const dateRange = buildIpDateRange(days, fromDate, toDate)

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
      <SndsReputationPanel panel={getSndsReputationPanel()} />
      <Suspense fallback={<PageSkeleton />}>
        <IpsTable ips={summary.ips} />
      </Suspense>
    </PageContainer>
  )
}
