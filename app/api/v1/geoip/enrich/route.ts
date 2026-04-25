import { upsertIp } from '@/services/geoip'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  let body: { ip?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: { code: 'BAD_REQUEST', message: 'Invalid JSON body' } },
      { status: 400 },
    )
  }

  if (typeof body.ip !== 'string' || !body.ip.trim()) {
    return NextResponse.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'ip must be a valid string',
        },
      },
      { status: 400 },
    )
  }

  try {
    const ipAddressId = await upsertIp(body.ip)
    return NextResponse.json({ data: { id: ipAddressId, ip: body.ip } })
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to enrich IP'
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message } },
      { status: 500 },
    )
  }
}
