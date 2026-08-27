'use client'

import { useDashboardFilters } from '@/hooks/dashboard/useDashboardFilters'
import { format } from 'date-fns'

/**
 * Builds URLSearchParams string from the current dashboard date filter state.
 * Returns a stable string key suitable for use as a `useEffect` dependency or
 * as a query string appended to API fetch URLs.
 */
export function useDateFilterParams(): string {
  const { days, from, to } = useDashboardFilters()
  const params = new URLSearchParams()
  if (from) {
    params.set('from', format(from, 'yyyy-MM-dd'))
  }
  if (to) {
    params.set('to', format(to, 'yyyy-MM-dd'))
  }
  if (!from && !to) {
    params.set('days', String(days))
  }
  return params.toString()
}
