import { formatDate } from '../../../formatters/formatDate'

/** "Oct 17, 2026" in UTC, so server and browser render the same text. */
export function formatShortDate(ms: number): string {
  return formatDate(new Date(ms))
}
