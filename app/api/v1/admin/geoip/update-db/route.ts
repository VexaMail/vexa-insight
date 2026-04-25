import { requireAdminAuth } from '@/services/api'
import { updateGeoIpDb } from '@/services/geoip'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const auth = requireAdminAuth(request)
  if (auth)
    return NextResponse.json({ error: auth.error }, { status: auth.status })

  try {
    await updateGeoIpDb()
    return NextResponse.json({ data: { success: true } })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Update failed'
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message } },
      { status: 500 },
    )
  }
}
