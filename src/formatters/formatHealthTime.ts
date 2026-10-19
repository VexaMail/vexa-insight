import { formatDateTime } from './formatDateTime'

/** `Oct 19, 2026 08:12 UTC`, or undefined without a date. */
export function formatHealthTime(date: Date | null): string | undefined {
  if (!date) return undefined
  return formatDateTime(date)
}
