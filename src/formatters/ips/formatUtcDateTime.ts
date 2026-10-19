import type { UtcDateTime } from '@/types/ips'

/** `Apr 28, 2026` and `12:14:32 (UTC)` for an epoch-seconds timestamp. */
export function formatUtcDateTime(epochSeconds: number): UtcDateTime {
  const value = new Date(epochSeconds * 1000)
  return {
    date: value.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    }),
    time: `${value.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC',
    })} (UTC)`,
  }
}
