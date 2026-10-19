import type { UtcDateTime } from '@/types/ips'
import { formatClockTime } from '../formatClockTime'
import { formatDate } from '../formatDate'

/** `Apr 28, 2026` and `12:14 UTC` for an epoch-seconds timestamp. */
export function formatUtcDateTime(epochSeconds: number): UtcDateTime {
  const value = new Date(epochSeconds * 1000)
  return { date: formatDate(value), time: formatClockTime(value) }
}
