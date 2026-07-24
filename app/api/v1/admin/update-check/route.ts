import { requireAdminAccess, requireAdminAuth } from '@/services/api'
import { requirePermission } from '@/services/auth'
import { checkForUpdates, getUpdateStatus } from '@/services/updates'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const access = await requireAdminAccess(request)
  if (access) {
    return NextResponse.json({ error: access.error }, { status: access.status })
  }
  const denied = await requirePermission('settings:read')
  if (denied) return denied
  const data = getUpdateStatus()
  return NextResponse.json({ data })
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const auth = requireAdminAuth(request)
  if (auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }
  const result = await checkForUpdates()
  if (!result.ok) {
    return NextResponse.json(
      {
        error: { code: 'UPDATE_CHECK_FAILED', message: result.error },
      },
      { status: 502 },
    )
  }
  const data = getUpdateStatus()
  return NextResponse.json({ data })
}
