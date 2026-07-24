import { withApiAuth } from '@/services/api'
import { getPollStatus } from '@/services/job'
import {
  pageQuerySchema,
  pollStatusPageSizeQuerySchema,
} from '@/validators/query'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export const GET = withApiAuth(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
  ): Promise<NextResponse> => {
    const { searchParams } = new URL(request.url)
    const page = pageQuerySchema.parse(searchParams.get('page') ?? undefined)
    const pageSize = pollStatusPageSizeQuerySchema.parse(
      searchParams.get('pageSize') ?? undefined,
    )

    const resolvedParams = await params
    const jobRunId = parseInt(resolvedParams.id, 10)

    if (isNaN(jobRunId)) {
      return NextResponse.json({ error: 'Invalid Job ID' }, { status: 400 })
    }

    const status = await getPollStatus(page, pageSize, jobRunId)

    return NextResponse.json({ data: status })
  },
)
