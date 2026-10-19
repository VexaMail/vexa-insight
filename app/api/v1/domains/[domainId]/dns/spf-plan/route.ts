import { withApiAuth } from '@/services/api'
import { requirePermission } from '@/services/auth'
import { planSpfRecord } from '@/services/diagnostics'
import { getDomainSummary } from '@/services/reports'
import type { DomainIdRouteParams } from '@/types/api'
import { parseIdParam } from '@/utils/api'
import { spfPlanInputSchema } from '@/validators/diagnostics'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * Counts the DNS lookups of a candidate SPF record before it is published.
 * Read-only: it resolves the candidate's includes and stores nothing.
 */
export const POST = withApiAuth(
  async (
    request: NextRequest,
    context: DomainIdRouteParams,
  ): Promise<NextResponse> => {
    const denied = await requirePermission('reports:read')
    if (denied) return denied
    const domainId = parseIdParam((await context.params).domainId)
    const summary = domainId == null ? null : await getDomainSummary(domainId)
    if (summary == null) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Domain not found' } },
        { status: 404 },
      )
    }
    const parsed = spfPlanInputSchema.safeParse(
      await request.json().catch(() => null),
    )
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: 'INVALID_INPUT',
            message: parsed.error.issues[0]?.message ?? 'Invalid record',
          },
        },
        { status: 400 },
      )
    }
    const plan = await planSpfRecord(summary.domainName, parsed.data.record)
    return NextResponse.json({ data: plan })
  },
)
