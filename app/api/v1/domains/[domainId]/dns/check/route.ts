import { withApiAuth } from '@/services/api'
import { requirePermission } from '@/services/auth'
import { recordDnsSnapshot } from '@/services/dns-history'
import { getDomainSummary } from '@/services/reports'
import type { DomainIdRouteParams } from '@/types/api'
import { parseIdParam } from '@/utils/api'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/** Looks the records up now and stores what changed since the last check. */
export const POST = withApiAuth(
  async (
    _request: NextRequest,
    context: DomainIdRouteParams,
  ): Promise<NextResponse> => {
    // A lookup that only records what DNS already says, like a hostname refresh.
    const denied = await requirePermission('reports:read')
    if (denied) return denied
    const { domainId: segment } = await context.params
    const domainId = parseIdParam(segment)

    if (domainId == null) {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'Invalid domain id' } },
        { status: 400 },
      )
    }

    const summary = await getDomainSummary(domainId)
    if (summary == null) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Domain not found' } },
        { status: 404 },
      )
    }

    const changes = await recordDnsSnapshot(summary.domainName, 'manual')
    return NextResponse.json({ data: { changes } })
  },
)
