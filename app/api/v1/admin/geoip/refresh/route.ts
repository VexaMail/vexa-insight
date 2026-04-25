import { requireAdminAuth } from '@/services/api'
import { refreshIpAddresses } from '@/services/geoip'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const auth = requireAdminAuth(request)
  if (auth)
    return NextResponse.json({ error: auth.error }, { status: auth.status })

  try {
    const result = await refreshIpAddresses()
    return NextResponse.json({ data: result })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Refresh failed'
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message } },
      { status: 500 },
    )
  }
}
