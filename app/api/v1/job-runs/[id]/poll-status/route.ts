import { withApiAuth } from '@/services/api'
import { getPollStatus } from '@/services/job'
import { parseIdParam } from '@/utils/api'
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
    const jobRunId = parseIdParam(resolvedParams.id)

    if (jobRunId == null) {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'Invalid job run id' } },
        { status: 400 },
      )
    }

    const status = await getPollStatus(page, pageSize, jobRunId)

    return NextResponse.json({ data: status })
  },
)
