import { formatDateTime } from './formatDateTime'

/** `Oct 19, 2026 08:12 UTC`, or "Never" without a date. */
export function formatUtcTime(date: Date | null): string {
  if (!date) return 'Never'
  return formatDateTime(date)
}
