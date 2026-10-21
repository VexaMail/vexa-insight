import {
  allowPublicCheck,
  getPublicDomainReport,
  normalizePublicDomain,
} from '@/services/public-check'
import { clientIpFromHeaders } from '@/utils/security'
import { normalizePublicDkimLabel } from '@/validators/public-check'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const domain = normalizePublicDomain(
    request.nextUrl.searchParams.get('domain') ?? '',
  )
  const selector = normalizePublicDkimLabel(
    request.nextUrl.searchParams.get('selector') ?? '',
  )
  if (selector === null)
    return NextResponse.json(
      { error: 'Enter a valid DKIM selector, such as google or selector1.' },
      { status: 400 },
    )
  if (!domain)
    return NextResponse.json(
      {
        error:
          'Enter a public domain, such as example.com, without a URL or email address.',
      },
      { status: 400 },
    )
  if (!allowPublicCheck(clientIpFromHeaders(request.headers) ?? 'anonymous')) {
    return NextResponse.json(
      { error: 'Too many checks. Please wait a minute and try again.' },
      { status: 429, headers: { 'Retry-After': '60' } },
    )
  }
  try {
    const report = await getPublicDomainReport(domain, selector || undefined)
    if (!report)
      return NextResponse.json(
        { error: 'The checker is busy. Please try again shortly.' },
        { status: 503, headers: { 'Retry-After': '10' } },
      )
    return NextResponse.json(report, {
      headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
    })
  } catch {
    return NextResponse.json(
      { error: 'The DNS check could not finish. Please try again shortly.' },
      { status: 503 },
    )
  }
}
