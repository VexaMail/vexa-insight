import { format } from 'date-fns'
import type { DateRange } from 'react-day-picker'

/** The query for a custom range; a missing bound is removed, not kept stale. */
export function buildCustomRangeParams(
  current: URLSearchParams,
  date: DateRange | undefined,
): URLSearchParams {
  const params = new URLSearchParams(current.toString())
  params.set('days', 'custom')
  if (date?.from) {
    params.set('from', format(date.from, 'yyyy-MM-dd'))
  } else {
    params.delete('from')
  }
  if (date?.to) {
    params.set('to', format(date.to, 'yyyy-MM-dd'))
  } else {
    params.delete('to')
  }
  return params
}
