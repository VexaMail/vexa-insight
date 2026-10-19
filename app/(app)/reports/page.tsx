import type { Metadata } from 'next'

import { DateRangeFilter } from '@/components/filters'
import { ReportsKpiStrip, ReportsTable } from '@/components/reports'
import { PageContainer, PageHeader } from '@/components/shell'
import { PageSkeleton } from '@/components/ui'
import { parseDateRangeParams } from '@/lib/utils'
import { getReportsWindowSummary } from '@/services/reports'
import {
  describeReportsWindow,
  parseReportsWindowFilter,
} from '@/utils/reports'
import { Suspense } from 'react'
import type { PageProps } from './PageProps'

export const metadata: Metadata = {
  title: 'Reports',
  description: 'DMARC Reports',
}

export const dynamic = 'force-dynamic'

export default async function ReportsPage(props: PageProps) {
  const unresolvedParams = await props.searchParams
  const { days, fromDate, toDate } = parseDateRangeParams(unresolvedParams)
  const summary = await getReportsWindowSummary(
    parseReportsWindowFilter(unresolvedParams),
  )

  return (
    <PageContainer className="space-y-6">
      <PageHeader
        eyebrow="Evidence"
        title="Reports"
        description="Aggregate reports received from receivers. Each one is evidence for a domain: who sent as it, and whether SPF or DKIM aligned."
        actions={
          <DateRangeFilter
            currentDays={days}
            from={fromDate}
            to={toDate}
            basePath="/reports"
          />
        }
      />

      <ReportsKpiStrip
        summary={summary}
        windowLabel={describeReportsWindow(days, fromDate, toDate)}
      />

      <Suspense fallback={<PageSkeleton />}>
        <ReportsTable />
      </Suspense>
    </PageContainer>
  )
}
