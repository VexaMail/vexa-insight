import { subDays } from 'date-fns'

export function getFromDateFromDays(now: Date, days: number): Date | undefined {
  if (!Number.isFinite(days) || days <= 0 || days >= 9999) return undefined
  return subDays(now, days)
}
