import { formatPrometheusOutput } from '@/formatters/metrics'
import { withApiAuth } from '@/services/api'
import { getMetricsSnapshot } from '@/services/metrics'
import { NextResponse } from 'next/server'

export const GET = withApiAuth(async (): Promise<NextResponse> => {
  const snapshot = getMetricsSnapshot()
  const body = formatPrometheusOutput(snapshot)
  return Promise.resolve(
    new NextResponse(body, {
      status: 200,
      headers: {
        'content-type': 'text/plain; version=0.0.4; charset=utf-8',
        'cache-control': 'no-store',
      },
    }),
  )
})
