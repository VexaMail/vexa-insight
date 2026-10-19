import {
  DashboardFilterInitializer,
  TriageHeader,
  TriageOverviewSkeleton,
} from '@/components/dashboard'
import { parseDateRangeParams } from '@/lib/utils'
import { requirePageSession } from '@/services/auth'
import { getSettingsForAdmin } from '@/services/settings'
import type { TriageOverviewScreenProps } from '@/types/dashboard'
import { parseTrendDays, resolveTriageWindow } from '@/utils/dashboard'
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
    <div className="max-w-console mx-auto w-full space-y-6">
      <DashboardFilterInitializer days={days} from={fromDate} to={toDate} />
      <TriageHeader
        days={days}
        basePath={basePath}
        from={fromDate}
        to={toDate}
        windowLabel={resolveTriageWindow(input).label}
      />
      <Suspense fallback={<TriageOverviewSkeleton />}>
        <TriageOverviewData
          input={input}
          apiKey={apiKey}
          trendDays={parseTrendDays(searchParams['trend'])}
        />
      </Suspense>
    </div>
  )
}
