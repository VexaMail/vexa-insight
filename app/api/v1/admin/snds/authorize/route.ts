import { requireAdminAuth } from '@/services/api'
import { getConfig } from '@/services/config'
import { startSndsAuthorization } from '@/services/snds'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function POST(request: NextRequest): NextResponse {
  const auth = requireAdminAuth(request)
  if (auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }
  const authorizeUrl = startSndsAuthorization(getConfig().secretKey)
  return NextResponse.json({ data: { authorizeUrl } })
}
