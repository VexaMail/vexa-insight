import { hasKnownPolicyDomain, ingestTlsReport } from '@/services/tlsrpt'
import { checkRateLimit, getRateLimitKey } from '@/utils/rateLimit'
import { parseTlsReportFileToResult } from '@/utils/tlsrpt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { readTlsrptBody } from './readTlsrptBody'
import { TLSRPT_CONTENT_TYPES } from './tlsrptContentTypes'
import { tlsrptError } from './tlsrptError'
import { TLSRPT_RATE_LIMIT } from './tlsrptRateLimit'

/**
 * HTTPS delivery of SMTP TLS reports (RFC 8460 section 5.2), for a
 * `rua=https://<host>/api/v1/tlsrpt` in a `_smtp._tls` record. Senders do not
 * authenticate, so only reports about a domain this instance monitors are
 * kept, and each client address is rate limited.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const key = `tlsrpt:${getRateLimitKey(request)}`
  if (
    !checkRateLimit(key, TLSRPT_RATE_LIMIT.limit, TLSRPT_RATE_LIMIT.windowMs)
  ) {
    return tlsrptError(429, 'TOO_MANY_REQUESTS', 'Rate limit exceeded')
  }
  const type = request.headers.get('content-type')?.split(';')[0]?.trim()
  if (!type || !TLSRPT_CONTENT_TYPES.has(type.toLowerCase())) {
    return tlsrptError(
      415,
      'UNSUPPORTED_MEDIA_TYPE',
      'Expected application/tlsrpt+json or application/tlsrpt+gzip',
    )
  }
  const body = await readTlsrptBody(request)
  if (body === null)
    return tlsrptError(413, 'PAYLOAD_TOO_LARGE', 'Report too large')
  const report = parseTlsReportFileToResult(body)
  if (report === null)
    return tlsrptError(400, 'BAD_REQUEST', 'Not a valid TLS report')
  if (!hasKnownPolicyDomain(report)) {
    return tlsrptError(403, 'FORBIDDEN', 'No policy domain is monitored here')
  }
  const result = ingestTlsReport(report)
  return NextResponse.json(
    { data: { stored: result.ingested } },
    { status: result.ingested ? 201 : 200 },
  )
}
