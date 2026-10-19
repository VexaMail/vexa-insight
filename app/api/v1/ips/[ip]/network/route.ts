import { withApiAuth } from '@/services/api'
import { requirePermission } from '@/services/auth'
import { getConfig } from '@/services/config'
import { getIpNetworkContext } from '@/services/ip-network'
import { getIpDetail } from '@/services/reports'
import { isPrivateIp } from '@/services/security'
import type { IpRouteParams } from '@/types/api'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { isIP } from 'node:net'

/**
 * Live forward-confirmed reverse DNS and ASN of a source address seen in
 * the caller's reports. Queries public DNS each time, so the page asks for it
 * only when it is opened; private ranges need the hostname-lookup setting.
 */
export const GET = withApiAuth(
  async (
    _request: NextRequest,
    { params }: IpRouteParams,
  ): Promise<NextResponse> => {
    const denied = await requirePermission('reports:read')
    if (denied) return denied
    const ip = decodeURIComponent((await params).ip)
    const isPrivate = isIP(ip) !== 0 && isPrivateIp(ip)
    if (
      isIP(ip) === 0 ||
      (isPrivate && !getConfig().ipHostnameAllowPrivateIps)
    ) {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'Invalid IP address' } },
        { status: 400 },
      )
    }
    // Only addresses the caller can already see in their reports, so the
    // endpoint is not a general-purpose DNS probe.
    if ((await getIpDetail(ip)) === null) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Unknown source' } },
        { status: 404 },
      )
    }
    return NextResponse.json({ data: await getIpNetworkContext(ip) })
  },
)
