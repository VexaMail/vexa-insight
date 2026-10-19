import { formatDateTime } from './formatDateTime'

/**
 * An ISO timestamp of the poll status as `Oct 19, 2026 03:00 UTC`; an
 * unparseable value is shown as given.
 */
export function formatPollStatusTime(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return formatDateTime(d)
}
