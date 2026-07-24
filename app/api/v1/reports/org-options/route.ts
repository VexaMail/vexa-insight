import { withApiAuth } from '@/services/api'
import { getReportOrgOptions } from '@/services/reports'
import { dateRangeQuerySchema, domainIdQuerySchema } from '@/validators/query'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const GET = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const { searchParams } = new URL(request.url)
    const domainId = domainIdQuerySchema.parse(searchParams.get('domainId'))
    const { from, to } = dateRangeQuerySchema.parse(
      Object.fromEntries(searchParams),
    )
    const items = await getReportOrgOptions(domainId ?? undefined, from, to)
    return NextResponse.json({ data: items })
  },
)
