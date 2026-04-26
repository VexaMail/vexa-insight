import { DispositionChart, SpfDkimChart, TrendChart } from '@/components/charts'
import {
  DashboardFilterInitializer,
  KpiCards,
  LatestReportsTable,
  LivePollStatusCard,
  PassRateRing,
  TopDomainsTable,
  TopIpSendersTable,
  VolumeByOrgTable,
} from '@/components/dashboard'
import { DateRangeFilter } from '@/components/filters'

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
    <div className="mx-auto max-w-7xl space-y-6">
      <DashboardFilterInitializer days={days} from={fromDate} to={toDate} />
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="font-display text-foreground text-2xl font-bold tracking-tight">
          Dashboard
        </h1>
        <Suspense
          fallback={
            <div className="bg-secondary h-9 w-[160px] animate-pulse rounded-md" />
          }
        >
          <DateRangeFilter
            currentDays={days}
            basePath="/"
            from={fromDate}
            to={toDate}
          />
        </Suspense>
      </div>

      {/* Hero Stats */}
      <KpiCards />

      {/* Pass Rate + Ingestion */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PassRateRing />
        </div>
        <LivePollStatusCard initialStatus={pollStatus} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DispositionChart />
        <SpfDkimChart />
      </div>

      {/* Trend */}
      <TrendChart />

      {/* 2×2 bottom grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <LatestReportsTable />
        <VolumeByOrgTable />
        <TopDomainsTable />
        <TopIpSendersTable />
      </div>
    </div>
  )
}
