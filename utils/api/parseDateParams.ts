/**
 * Parses `from` and `to` ISO date strings from URLSearchParams.
 * Returns undefined for invalid or missing values.
 */
import { getFromDateFromDays } from '@/utils/dates'

export function parseDateParams(searchParams: URLSearchParams): {
  from: Date | undefined
  to: Date | undefined
} {
  const fromStr = searchParams.get('from')
  const toStr = searchParams.get('to')

  let from = fromStr ? new Date(fromStr) : undefined
  const to = toStr ? new Date(toStr) : undefined

  from = from && !isNaN(from.getTime()) ? from : undefined

  if (!from && !to) {
    const daysStr = searchParams.get('days')
    if (daysStr && daysStr !== 'custom') {
      const days = parseInt(daysStr, 10)
      if (!isNaN(days) && days > 0 && days < 9999) {
        from = getFromDateFromDays(new Date(), days)
      }
    }
  }

  return {
    from,
    to: to && !isNaN(to.getTime()) ? to : undefined,
  }
}
