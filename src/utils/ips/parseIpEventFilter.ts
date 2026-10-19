import type { IpEventFilter } from '@/types/ips'

/** The `?events=` of a source page, `all` when missing or unknown. */
export function parseIpEventFilter(
  value: string | string[] | undefined,
): IpEventFilter {
  const raw = Array.isArray(value) ? value[0] : value
  return raw === 'fail' || raw === 'pass' ? raw : 'all'
}
