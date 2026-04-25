import type { SpfDkimBreakdown } from '@/types/reports'

export async function fetchSpfDkimBreakdown(
  queryString: string,
): Promise<SpfDkimBreakdown> {
  const qs = queryString ? `?${queryString}` : ''
  const res = await fetch(`/api/v1/stats/spf-dkim${qs}`)
  const json = (await res.json()) as { data: SpfDkimBreakdown }
  return json.data
}
