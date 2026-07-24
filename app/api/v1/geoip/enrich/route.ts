import { withApiAuth } from '@/services/api'
import { requirePermission } from '@/services/auth'
import { upsertIp } from '@/services/geoip'
import { geoipEnrichSchema } from '@/validators/geoip'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const POST = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const denied = await requirePermission('reports:write')
    if (denied) return denied
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'Invalid JSON body' } },
        { status: 400 },
      )
    }

    const parsed = geoipEnrichSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message:
              parsed.error.issues[0]?.message ?? 'ip must be a valid string',
          },
        },
        { status: 400 },
      )
    }

    const { ip } = parsed.data
    try {
      const ipAddressId = await upsertIp(ip)
      return NextResponse.json({ data: { id: ipAddressId, ip } })
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to enrich IP'
      return NextResponse.json(
        { error: { code: 'INTERNAL_ERROR', message } },
        { status: 500 },
      )
    }
  },
)
