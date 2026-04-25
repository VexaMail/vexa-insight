import { requireAdminAuth } from '@/services/api'
import { getJobRunHistory } from '@/services/job'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const auth = requireAdminAuth(request)
  if (auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }
  const { searchParams } = new URL(request.url)
  const limit = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get('limit') ?? '50', 10) || 50),
  )
  const data = await getJobRunHistory(limit)
  return NextResponse.json({
    data: data.map((r) => ({
      ...r,
      runAt: r.runAt.toISOString(),
    })),
  })
}
