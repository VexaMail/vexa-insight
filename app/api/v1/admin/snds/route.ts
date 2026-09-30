import { requireAdminAuth } from '@/services/api'
import { disconnectSnds, getSndsConnectionPublic } from '@/services/snds'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function GET(request: NextRequest): NextResponse {
  const auth = requireAdminAuth(request)
  if (auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }
  return NextResponse.json({ data: getSndsConnectionPublic() })
}

export function DELETE(request: NextRequest): NextResponse {
  const auth = requireAdminAuth(request)
  if (auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }
  disconnectSnds()
  return NextResponse.json({ data: getSndsConnectionPublic() })
}
