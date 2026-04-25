import { requireAdminAuth } from '@/services/api'
import { getPollStatusFromDb } from '@/services/job'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const auth = requireAdminAuth(request)
  if (auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }
  const status = await getPollStatusFromDb()
  return NextResponse.json({
    data: {
      isRunning: status.isRunning,
      lastCheck: status.lastCheck?.toISOString() ?? null,
    },
  })
}
