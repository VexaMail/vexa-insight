import type { Metadata } from 'next'

import { DateRangeFilter } from '@/components/filters'
import { ReportsKpiStrip, ReportsTable } from '@/components/reports'
import { PageContainer, PageHeader } from '@/components/shell'
import { PageSkeleton, Panel } from '@/components/ui'
import { parseDateRangeParams } from '@/lib/utils'
import {
  getReportsWindowSummary,
  getReportsWindowTrends,
} from '@/services/reports'
import {
  describeReportsWindow,
  parseReportsWindowFilter,
} from '@/utils/reports'
import { FileText } from 'lucide-react'
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
  const filter = parseReportsWindowFilter(unresolvedParams)
  const [summary, trends] = await Promise.all([
    getReportsWindowSummary(filter),
    getReportsWindowTrends(filter),
  ])
  const windowLabel = describeReportsWindow(days, fromDate, toDate)

  return (
    <PageContainer className="space-y-6">
      <PageHeader
        title="Reports"
        description="Aggregate reports received from receivers. Each one is evidence for a domain: who sent as it, and whether SPF or DKIM aligned."
        period={
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
        trends={trends}
        windowLabel={windowLabel}
      />

      <Panel
        icon={<FileText />}
        title="Aggregate reports"
        description={`Newest first, ${windowLabel}. The status pill leads with the DMARC result, then says whether every message aligned on both SPF and DKIM; open a report for its sources and raw XML.`}
      >
        <Suspense fallback={<PageSkeleton />}>
          <ReportsTable />
        </Suspense>
      </Panel>
    </PageContainer>
  )
}
