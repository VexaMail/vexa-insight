import { withApiAuth } from '@/services/api'
import { requirePermission } from '@/services/auth'
import { getIpNetworkContext } from '@/services/ip-network'
import type { IpRouteParams } from '@/types/api'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { isIP } from 'node:net'

/**
 * Live forward-confirmed reverse DNS and ASN of a source address. Queries
 * public DNS each time, so the page asks for it only when it is opened.
 */
export const GET = withApiAuth(
  async (
    _request: NextRequest,
    { params }: IpRouteParams,
  ): Promise<NextResponse> => {
    const denied = await requirePermission('reports:read')
    if (denied) return denied
    const ip = decodeURIComponent((await params).ip)
    if (isIP(ip) === 0) {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'Invalid IP address' } },
        { status: 400 },
      )
    }
    return NextResponse.json({ data: await getIpNetworkContext(ip) })
  },
)
