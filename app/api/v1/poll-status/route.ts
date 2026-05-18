import { withApiAuth } from '@/services/api'
import { getPollStatus } from '@/services/job'
import { coerceNumber, pollStatusPageSize } from '@/utils/validation'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { DEFAULT_PAGE } from './defaultPage'

export const dynamic = 'force-dynamic'

export const GET = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const DEFAULT_PAGE_SIZE = 50
    const { searchParams } = new URL(request.url)
    const pageRaw = coerceNumber(searchParams.get('page')) ?? DEFAULT_PAGE
    const pageSizeRaw =
      coerceNumber(searchParams.get('pageSize')) ?? DEFAULT_PAGE_SIZE
    const page = Math.max(1, Math.floor(pageRaw))
    const pageSize = pollStatusPageSize(pageSizeRaw)

    const status = await getPollStatus(page, pageSize)

    return NextResponse.json({ data: status })
  },
)
