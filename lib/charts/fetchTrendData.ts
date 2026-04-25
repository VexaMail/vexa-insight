import type { TrendDataPoint } from '@/types/reports'

export async function fetchTrendData(params: {
  period: 'hour' | 'day'
  queryString: string
}): Promise<TrendDataPoint[]> {
  const res = await fetch(
    `/api/v1/stats/trend?period=${params.period}&${params.queryString}`,
  )
  const json = (await res.json()) as { data: TrendDataPoint[] }
  return json.data
}
