import type { Metadata } from 'next'

import { DateRangeFilter } from '@/components/filters'
import { ReportsTable } from '@/components/reports'
import { PageContainer, PageHeader } from '@/components/shell'
import { PageSkeleton } from '@/components/ui'
import { parseDateRangeParams } from '@/lib/utils'
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

  return (
    <PageContainer>
      <PageHeader
        title="Reports"
        description="DMARC aggregate reports received from your reporting partners."
        actions={
          <DateRangeFilter
            currentDays={days}
            from={fromDate}
            to={toDate}
            basePath="/reports"
          />
        }
      />

      <Suspense fallback={<PageSkeleton />}>
        <ReportsTable />
      </Suspense>
    </PageContainer>
  )
}
