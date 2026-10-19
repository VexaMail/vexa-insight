import { DashboardDateRangeFilter } from '@/components/dashboard'
import { PageHeader } from '@/components/shell'
import { PageSkeleton } from '@/components/ui'
import { parseDateRangeParams } from '@/lib/utils'
import { requirePageSession } from '@/services/auth'
import type { TriageOverviewScreenProps } from '@/types/dashboard'
import { Suspense } from 'react'
import { IssuesData } from './IssuesData'

/** /issues: every issue the overview derives, with operator state. */
export async function IssuesScreen({
  searchParams,
  basePath,
}: TriageOverviewScreenProps) {
  await requirePageSession()
  const { days, fromDate, toDate } = parseDateRangeParams(searchParams)
  const input = {
    days,
    now: new Date(),
    ...(fromDate ? { from: fromDate } : {}),
    ...(toDate ? { to: toDate } : {}),
  }
  return (
    <div className="max-w-console mx-auto w-full space-y-6">
      <PageHeader
        title="Issues"
        description="Every problem derived from report data and ingestion runs. Acknowledge what you are handling, snooze what can wait, and open the evidence behind each row."
        period={
          <DashboardDateRangeFilter
            currentDays={days}
            basePath={basePath}
            from={fromDate}
            to={toDate}
          />
        }
      />
      <Suspense fallback={<PageSkeleton />}>
        <IssuesData input={input} />
      </Suspense>
    </div>
  )
}
