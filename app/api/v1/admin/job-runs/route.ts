import { requireAdminAuth } from '@/services/api'
import { getJobRunHistory } from '@/services/job'
import { jobRunHistoryLimitQuerySchema } from '@/validators/query'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const auth = requireAdminAuth(request)
  if (auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }
  const { searchParams } = new URL(request.url)
  const limit = jobRunHistoryLimitQuerySchema.parse(
    searchParams.get('limit') ?? undefined,
  )
  const data = await getJobRunHistory(limit)
  return NextResponse.json({
    data: data.map((r) => ({
      ...r,
      runAt: r.runAt.toISOString(),
    })),
  })
}
