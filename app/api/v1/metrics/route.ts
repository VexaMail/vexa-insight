import { formatPrometheusOutput } from '@/formatters/metrics'
import { requireAdminAccess } from '@/services/api'
import { getMetricsSnapshot } from '@/services/metrics'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const access = await requireAdminAccess(request)
  if (access) {
    return NextResponse.json({ error: access.error }, { status: access.status })
  }
  const snapshot = await getMetricsSnapshot()
  const body = formatPrometheusOutput(snapshot)
  return new NextResponse(body, {
    status: 200,
    headers: {
      'content-type': 'text/plain; version=0.0.4; charset=utf-8',
      'cache-control': 'no-store',
    },
  })
}
