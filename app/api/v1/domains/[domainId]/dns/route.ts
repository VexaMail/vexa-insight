import { getDomainDnsRecords } from '@/services/diagnostics'
import { getDomainSummary } from '@/services/reports'
import { parseIdParam } from '@/utils/api'
import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  context: { params: Promise<{ domainId: string }> },
): Promise<NextResponse> {
  const { domainId: segment } = await context.params
  const domainId = parseIdParam(segment)

  if (domainId == null) {
    return NextResponse.json(
      { error: { code: 'BAD_REQUEST', message: 'Invalid domain id' } },
      { status: 400 },
    )
  }

  const summary = await getDomainSummary(domainId)
  if (summary == null) {
    return NextResponse.json(
      { error: { code: 'NOT_FOUND', message: 'Domain not found' } },
      { status: 404 },
    )
  }

  const data = await getDomainDnsRecords(summary.domainName)
  return NextResponse.json({ data })
}
