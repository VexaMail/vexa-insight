import {
  DashboardDateRangeFilter,
  DashboardFilterInitializer,
  TriageOverviewSkeleton,
} from '@/components/dashboard'
import { PageHeader } from '@/components/shell'
import { parseDateRangeParams } from '@/lib/utils'
import { requirePageSession } from '@/services/auth'
import { getSettingsForAdmin } from '@/services/settings'
import type { TriageOverviewScreenProps } from '@/types/dashboard'
import { resolveTriageWindow } from '@/utils/dashboard'
import { adminOnlyApiKey } from '@/utils/ingest'
import { Suspense } from 'react'
import { TriageOverviewData } from './TriageOverviewData'

/** Home and /dashboard: the triage overview for the URL's date filter. */
export async function TriageOverviewScreen({
  searchParams,
  basePath,
}: TriageOverviewScreenProps) {
  const session = await requirePageSession()
  const { days, fromDate, toDate } = parseDateRangeParams(searchParams)
  const input = {
    days,
    now: new Date(),
    ...(fromDate ? { from: fromDate } : {}),
    ...(toDate ? { to: toDate } : {}),
  }
  const apiKey = adminOnlyApiKey(
    session.user.role,
    getSettingsForAdmin()?.apiToken,
  )

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <DashboardFilterInitializer days={days} from={fromDate} to={toDate} />
      <PageHeader
        title="Overview"
        description={`What needs attention across your monitored domains, ${resolveTriageWindow(input).label} (UTC report days).`}
        actions={
          <DashboardDateRangeFilter
            currentDays={days}
            basePath={basePath}
            from={fromDate}
            to={toDate}
          />
        }
      />
      <Suspense fallback={<TriageOverviewSkeleton />}>
        <TriageOverviewData input={input} apiKey={apiKey} />
      </Suspense>
    </div>
  )
}
