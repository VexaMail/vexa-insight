import { DispositionChart, SpfDkimChart, TrendChart } from '@/components/charts'
import {
  DashboardFilterInitializer,
  KpiCards,
  LatestReportsTable,
  PassRateRing,
  PollStatusCard,
  TopDomainsTable,
  VolumeByOrgTable,
} from '@/components/dashboard'
import { DateRangeFilter } from '@/components/filters'
import { PageContainer, PageHeader } from '@/components/shell'

import type { Metadata } from 'next'
import { Suspense } from 'react'

import { parseDateRangeParams } from '@/lib/utils'
import { getPollStatusSafe } from '@/services/job'

export const metadata: Metadata = {
  title: 'Dashboard | Vexa Insight',
}

export const dynamic = 'force-dynamic'

export default async function DashboardPage({
  searchParams,
}: {
  readonly searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}) {
  const sp = await searchParams
  const { days, fromDate, toDate } = parseDateRangeParams(sp)
  const pollStatus = await getPollStatusSafe()

  return (
    <PageContainer>
      <DashboardFilterInitializer days={days} from={fromDate} to={toDate} />

      <PageHeader
        title="Dashboard"
        actions={
          <Suspense
            fallback={
              <div className="bg-secondary h-9 w-[160px] animate-pulse rounded-md" />
            }
          >
            <DateRangeFilter
              currentDays={days}
              basePath="/dashboard"
              from={fromDate}
              to={toDate}
            />
          </Suspense>
        }
      />

      <KpiCards />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PassRateRing />
        </div>
        <PollStatusCard status={pollStatus} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DispositionChart />
        <SpfDkimChart />
      </div>

      <TrendChart />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <VolumeByOrgTable />
        </div>
        <div className="lg:col-span-1">
          <TopDomainsTable />
        </div>
        <div className="lg:col-span-1">
          <LatestReportsTable />
        </div>
      </div>
    </PageContainer>
  )
}
