import { withApiAuth } from '@/services/api'
import { getDomainSources, getDomainSummary } from '@/services/reports'
import { parseIdParam } from '@/utils/api'
import { domainSourcesCsv } from '@/utils/csv'
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
    // getDomainSummary applies the caller's domain allow-list, as in the
    // sibling routes; getDomainSources alone does not.
    if ((await getDomainSummary(domainId)) == null) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Domain not found' } },
        { status: 404 },
      )
    }
    const url = new URL(request.url)
    const daysFilter = daysFilterQuerySchema.parse(
      url.searchParams.get('days') ?? undefined,
    )
    const sources = await getDomainSources(domainId, daysFilter)
    if (url.searchParams.get('format') === 'csv') {
      return new NextResponse(domainSourcesCsv(sources), {
        headers: {
          'content-type': 'text/csv; charset=utf-8',
          'content-disposition': `attachment; filename="domain-${String(domainId)}-sources.csv"`,
        },
      })
    }
    return NextResponse.json({ data: sources })
  },
)
