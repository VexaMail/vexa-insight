import type { Metadata } from 'next'

import { DateRangeFilter } from '@/components/filters'
import { ReportsTable } from '@/components/reports'
import { parseDateRangeParams } from '@/lib/utils'
import { Suspense } from 'react'
import type { PageProps } from './PageProps'

export const metadata: Metadata = {
  title: 'Reports | Vexa Insight',
  description: 'DMARC Reports',
}

export default async function ReportsPage(props: PageProps) {
  const unresolvedParams = await props.searchParams
  const { days, fromDate, toDate } = parseDateRangeParams(unresolvedParams)

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Reports
        </h1>
        <DateRangeFilter
          currentDays={days}
          from={fromDate}
          to={toDate}
          basePath="/reports"
        />
      </div>

      <Suspense
        fallback={<div className="glass-card bg-muted/20 animate-pulse p-8" />}
      >
        <ReportsTable />
      </Suspense>
    </div>
  )
}
