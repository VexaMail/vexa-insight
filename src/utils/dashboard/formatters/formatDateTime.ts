import { formatDateTime as formatConsoleDateTime } from '@/utils/format'

/** "Oct 19, 2026 03:00 UTC" for epoch milliseconds, in the console format. */
export function formatDateTime(ms: number): string {
  return formatConsoleDateTime(new Date(ms))
}
