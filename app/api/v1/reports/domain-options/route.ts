import { withApiAuth } from '@/services/api'
import { getReportDomainOptions } from '@/services/reports'
import { dateRangeQuerySchema } from '@/validators/query'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const GET = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const { searchParams } = new URL(request.url)
    const { from, to } = dateRangeQuerySchema.parse(
      Object.fromEntries(searchParams),
    )
    const items = await getReportDomainOptions(from, to)
    return NextResponse.json({ data: items })
  },
)
