import { formatClockTime } from './formatClockTime'
import { formatDate } from './formatDate'

/** `Oct 16, 2026 08:12 UTC`: the one date-and-time format of the console. */
export function formatDateTime(date: Date): string {
  return `${formatDate(date)} ${formatClockTime(date)}`
}
