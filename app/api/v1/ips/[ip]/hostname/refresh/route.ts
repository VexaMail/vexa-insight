import { withApiAuth } from '@/services/api'
import { requirePermission } from '@/services/auth'
import { getConfig } from '@/services/config'
import { IpHostnameEnrichmentService } from '@/services/ip-hostname'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const POST = withApiAuth(
  async (
    _request: NextRequest,
    { params }: { params: Promise<{ ip: string }> },
  ): Promise<NextResponse> => {
    const denied = await requirePermission('reports:read')
    if (denied) return denied
    const { ip } = await params
    const config = getConfig()

    if (!config.ipHostnameManualRefreshEnabled) {
      return NextResponse.json(
        { error: 'Manual refresh is disabled' },
        { status: 403 },
      )
    }

    try {
      // Await inline instead of fire-and-forget to return immediate status unless you prefer 202 Accepted.
      // In this specific flow, since it is a user action on an ip, waiting ~1-2 seconds is acceptable.
      const payload = await IpHostnameEnrichmentService.resolveAndPersist(
        ip,
        true,
        'user',
      )

      return NextResponse.json(payload, { status: 200 })
    } catch (error: unknown) {
      const details = error instanceof Error ? error.message : String(error)
      return NextResponse.json(
        { error: 'Failed to refresh hostname', details },
        { status: 500 },
      )
    }
  },
)
