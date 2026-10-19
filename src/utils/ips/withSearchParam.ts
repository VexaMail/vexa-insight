import type { SearchParamsRecord } from '@/types/ips'

/**
 * `basePath` with the current query string, `key` set to `value` (or removed
 * when null), so a filter or tab link keeps the date range.
 */
export function withSearchParam(
  basePath: string,
  searchParams: SearchParamsRecord,
  key: string,
  value: string | null,
): string {
  const params = new URLSearchParams()
  for (const [name, raw] of Object.entries(searchParams)) {
    if (name === key || raw === undefined) continue
    for (const item of Array.isArray(raw) ? raw : [raw])
      params.append(name, item)
  }
  if (value !== null) params.set(key, value)
  const query = params.toString()
  return query === '' ? basePath : `${basePath}?${query}`
}
