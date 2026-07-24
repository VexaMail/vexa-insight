import { withApiAuth } from '@/services/api'
import { getDomainSources } from '@/services/reports'
import { parseIdParam } from '@/utils/api'
import { daysFilterQuerySchema } from '@/validators/query'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const GET = withApiAuth(
  async (
    request: NextRequest,
    context: { params: Promise<{ domainId: string }> },
  ): Promise<NextResponse> => {
    const { domainId: segment } = await context.params
    const domainId = parseIdParam(segment)
    if (domainId == null) {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'Invalid domain id' } },
        { status: 400 },
      )
    }
    const url = new URL(request.url)
    const daysFilter = daysFilterQuerySchema.parse(
      url.searchParams.get('days') ?? undefined,
    )
    const sources = await getDomainSources(domainId, daysFilter)
    return NextResponse.json({ data: sources })
  },
)
