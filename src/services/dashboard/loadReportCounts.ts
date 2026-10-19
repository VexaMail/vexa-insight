import type { CountComparison, TriageWindow } from '@/types/dashboard'
import { queryReportCount } from './queryReportCount'

/** Reports in the current period and in the previous one. */
export async function loadReportCounts(
  window: TriageWindow,
  allowedIds: number[] | null,
): Promise<CountComparison> {
  const [current, previous] = await Promise.all([
    queryReportCount(window.current, allowedIds),
    window.previous ? queryReportCount(window.previous, allowedIds) : null,
  ])
  return { current, previous }
}
