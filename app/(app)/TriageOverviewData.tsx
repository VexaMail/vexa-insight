import { TriageOverviewView } from '@/components/dashboard'
import { getTriageOverview } from '@/services/dashboard'
import type { TriageOverviewDataProps } from '@/types/dashboard'

/** Loads the overview and renders it; streamed behind the page header. */
export async function TriageOverviewData({
  input,
  apiKey,
  trendDays,
}: TriageOverviewDataProps) {
  const overview = await getTriageOverview(input, trendDays)
  return (
    <TriageOverviewView
      overview={overview}
      nowMs={input.now.getTime()}
      apiKey={apiKey}
    />
  )
}
