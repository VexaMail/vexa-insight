import { getDomainSummary, getReportsByDomainId } from '@/services/reports'
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
  const domain = await getDomainSummary(domainId)
  if (domain == null) {
    return NextResponse.json(
      { error: { code: 'NOT_FOUND', message: 'Domain not found' } },
      { status: 404 },
    )
  }
  const reports = await getReportsByDomainId(domainId)
  return NextResponse.json({ data: reports })
}
