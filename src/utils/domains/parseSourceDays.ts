import { SOURCE_WINDOW_OPTIONS } from '@/constants/domains'

/** The `?days=` value of the sources tab; undefined means all reports. */
export function parseSourceDays(
  value: string | string[] | undefined,
): number | undefined {
  const days = Number(value)
  return SOURCE_WINDOW_OPTIONS.find((o) => o.days === days && days > 0)?.days
}
