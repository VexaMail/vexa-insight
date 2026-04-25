import { requireAdminAuth } from '@/services/api'
import { createUpdateDbStream } from '@/services/geoip'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// We need to use Edge, or Node with Server-Sent Events pattern
// For Server-Sent Events, we return a web Standard Response with a ReadableStream
export async function GET(request: NextRequest) {
  // EventSource cannot send custom headers easily, so we read from URL query params
  const apiKey = request.nextUrl.searchParams.get('apiKey')

  // Re-use logic from requireAdminAuth, but we must construct a dummy request headers
  // since requireAdminAuth reads from request.headers.
  const authHeaders = new Headers()
  if (apiKey) {
    authHeaders.set('x-api-key', apiKey)
  }
  const dummyRequest = new Request(request.url, {
    headers: authHeaders,
  }) as NextRequest

  const auth = requireAdminAuth(dummyRequest)
  if (auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
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
