import { SECONDS_PER_DAY } from '../utils/format/secondsPerDay'
import { SECONDS_PER_HOUR } from '../utils/format/secondsPerHour'
import { SECONDS_PER_MINUTE } from '../utils/format/secondsPerMinute'
import { formatAgoUnit } from './formatAgoUnit'

/**
 * Elapsed seconds in the long relative form of the console: "just now",
 * "5 minutes ago", "3 days ago", "2 months ago", "1 year ago".
 */
export function formatTimeAgo(elapsedSeconds: number): string {
  const seconds = Math.max(0, elapsedSeconds)
  if (seconds < SECONDS_PER_MINUTE) return 'just now'
  if (seconds < SECONDS_PER_HOUR)
    return formatAgoUnit(Math.floor(seconds / SECONDS_PER_MINUTE), 'minute')
  if (seconds < SECONDS_PER_DAY)
    return formatAgoUnit(Math.floor(seconds / SECONDS_PER_HOUR), 'hour')
  const days = Math.floor(seconds / SECONDS_PER_DAY)
  if (days < 30) return formatAgoUnit(days, 'day')
  if (days < 365) return formatAgoUnit(Math.floor(days / 30), 'month')
  return formatAgoUnit(Math.floor(days / 365), 'year')
}
