import { withApiAuth } from '@/services/api'
import { requirePermission } from '@/services/auth'
import { refreshDiagnosticsOverview } from '@/services/diagnostics'
import { diagnosticsOverviewRefreshSchema } from '@/validators/diagnostics'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * POST /api/v1/diagnostics/overview/refresh
 * Runs the DNS checks of one batch of domains now, stores them for the
 * diagnostics index and returns their rows. Domains the caller cannot see
 * are left out of the answer.
 * Body: { domainIds: number[] } (at most one batch)
 */
export const POST = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    // A lookup that only records what DNS already says, like "Check now".
    const denied = await requirePermission('reports:read')
    if (denied) return denied
    const parsed = diagnosticsOverviewRefreshSchema.safeParse(
      await request.json().catch(() => null),
    )
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: 'INVALID_INPUT',
            message: 'Body must be { domainIds: number[] } with one batch.',
          },
        },
        { status: 400 },
      )
    }
    const rows = await refreshDiagnosticsOverview(parsed.data.domainIds)
    return NextResponse.json({ data: { rows } })
  },
)
