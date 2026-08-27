import { issueStreamTicket, requireAdminAuth } from '@/services/api'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Mints a single-use ticket for the GeoIP update SSE stream. Authenticated the
 * normal way (`X-API-Key` / `Authorization` header) so the admin key never has
 * to travel in a URL that proxies and browser history record.
 */
export function POST(request: NextRequest): NextResponse {
  const auth = requireAdminAuth(request)
  if (auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  return NextResponse.json({ data: { ticket: issueStreamTicket() } })
}
