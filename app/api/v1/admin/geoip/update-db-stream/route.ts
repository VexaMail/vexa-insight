import { consumeStreamTicket } from '@/services/api'
import { createUpdateDbStream } from '@/services/geoip'
import { nonEmptyTextQuerySchema } from '@/validators/query'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Streams GeoIP database update progress as Server-Sent Events.
 *
 * EventSource cannot set request headers, so this is the one route that
 * authenticates from the query string. It accepts a single-use, short-lived
 * ticket from `POST /api/v1/admin/geoip/update-db-ticket` rather than the
 * long-lived `SECRET_KEY`: the value that ends up in proxy logs and browser
 * history is already spent by the time it is written there.
 */
export function GET(request: NextRequest) {
  const ticket = nonEmptyTextQuerySchema.parse(
    request.nextUrl.searchParams.get('ticket'),
  )

  if (!consumeStreamTicket(ticket)) {
    return NextResponse.json(
      {
        error: {
          code: 'UNAUTHORIZED',
          message: 'Invalid or expired stream ticket',
        },
      },
      { status: 401 },
    )
  }

  const stream = createUpdateDbStream()

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
