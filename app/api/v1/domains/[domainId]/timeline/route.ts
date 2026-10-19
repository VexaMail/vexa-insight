import { withApiAuth } from '@/services/api'
import { getDomainSummary } from '@/services/reports'
import { getDomainHealthTimeline } from '@/services/timeline'
import type { DomainIdRouteParams } from '@/types/api'
import { parseIdParam } from '@/utils/api'
import { daysFilterQuerySchema } from '@/validators/query'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/** Daily DMARC results with DNS, source and operator events (`?days=`). */
export const GET = withApiAuth(
  async (
    request: NextRequest,
    context: DomainIdRouteParams,
  ): Promise<NextResponse> => {
    const domainId = parseIdParam((await context.params).domainId)
    const summary = domainId == null ? null : await getDomainSummary(domainId)
    if (summary == null) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Domain not found' } },
        { status: 404 },
      )
    }
    const days =
      daysFilterQuerySchema.parse(request.nextUrl.searchParams.get('days')) ??
      90
    return NextResponse.json({
      data: await getDomainHealthTimeline(summary.domainName, days),
    })
  },
)
