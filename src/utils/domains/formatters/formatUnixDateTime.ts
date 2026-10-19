import { formatDateTime } from '../../../formatters/formatDateTime'

/** `Jan 31, 2026 12:00 UTC`: the same text on server and client. */
export function formatUnixDateTime(unixSeconds: number): string {
  return formatDateTime(new Date(unixSeconds * 1000))
}
