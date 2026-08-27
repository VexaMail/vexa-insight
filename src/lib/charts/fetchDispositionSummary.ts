import type { DomainsSummaryResponse } from '@/types/reports'

export async function fetchDispositionSummary(
  queryString: string,
): Promise<DomainsSummaryResponse> {
  const qs = queryString ? `?${queryString}` : ''
  const res = await fetch(`/api/v1/domains/summary${qs}`)
  const json = (await res.json()) as { data: DomainsSummaryResponse }
  return json.data
}
