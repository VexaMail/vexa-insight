import { DispositionChart, SpfDkimChart, TrendChart } from '@/components/charts'
import {
  DashboardDateRangeFilter,
  DashboardFilterInitializer,
  KpiCards,
  LatestReportsTable,
  PassRateRing,
  PollStatusCard,
  TopDomainsTable,
  VolumeByOrgTable,
} from '@/components/dashboard'
import { PageContainer, PageHeader } from '@/components/shell'

import type { Metadata } from 'next'

import { parseDateRangeParams } from '@/lib/utils'
import { getPollStatusSafe } from '@/services/job'
import type { DashboardPageProps } from '@/types/dashboard'

export const metadata: Metadata = {
  title: 'Dashboard | Vexa Insight',
}

export const dynamic = 'force-dynamic'

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const sp = await searchParams
  const { days, fromDate, toDate } = parseDateRangeParams(sp)
  const pollStatus = await getPollStatusSafe()

  return (
    <PageContainer>
      <DashboardFilterInitializer days={days} from={fromDate} to={toDate} />

      <PageHeader
        title="Dashboard"
        actions={
          <DashboardDateRangeFilter
            currentDays={days}
            basePath="/dashboard"
            from={fromDate}
            to={toDate}
          />
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
