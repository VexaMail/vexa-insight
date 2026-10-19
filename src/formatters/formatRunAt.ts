import { formatDateTime } from './formatDateTime'

/** When a run happened, as `Oct 19, 2026 12:00 UTC`. */
export function formatRunAt(d: Date): string {
  return formatDateTime(d)
}
