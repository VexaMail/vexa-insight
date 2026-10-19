import { formatDistanceStrict } from 'date-fns'

/** "3 hours ago", "in 12 minutes", or "never" when there is no date. */
export function describeAge(date: Date | null, now: Date): string {
  if (!date) return 'never'
  return formatDistanceStrict(date, now, { addSuffix: true })
}
