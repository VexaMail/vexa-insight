import { DAY_SECONDS } from './daySeconds'

/**
 * Start of a "last N days" window in whole UTC days: 00:00 UTC of the day
 * N - 1 days before today, the same report days the overview counts, so every
 * page that says "last 30 days" covers the same reports.
 */
export function getFromDateFromDays(now: Date, days: number): Date | undefined {
  if (!Number.isFinite(days) || days <= 0 || days >= 9999) return undefined
  const today = Math.floor(now.getTime() / 1000 / DAY_SECONDS)
  return new Date((today - days + 1) * DAY_SECONDS * 1000)
}
