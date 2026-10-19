import { formatDateTime } from './formatDateTime'

/**
 * A report boundary in Unix seconds as `Oct 16, 2026 00:00 UTC`, the zone
 * DMARC report periods are written in.
 */
export function formatReportTimestamp(unixSeconds: number): string {
  return formatDateTime(new Date(unixSeconds * 1000))
}
