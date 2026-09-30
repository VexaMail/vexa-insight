import { requireAdminAuth } from '@/services/api'
import { getConfig } from '@/services/config'
import { getSndsConnectionPublic, syncSnds } from '@/services/snds'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const auth = requireAdminAuth(request)
  if (auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }
  const sync = await syncSnds(getConfig().secretKey)
  return NextResponse.json({
    data: { connection: getSndsConnectionPublic(), sync },
  })
}
