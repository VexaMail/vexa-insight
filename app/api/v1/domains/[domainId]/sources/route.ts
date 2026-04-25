import { getDomainSources } from '@/services/reports'
import { parseIdParam } from '@/utils/api'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
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
  const url = new URL(request.url)
  const daysParam = url.searchParams.get('days')
  const daysNum = daysParam != null ? Number.parseInt(daysParam, 10) : undefined
  const daysFilter =
    typeof daysNum === 'number' && Number.isInteger(daysNum) && daysNum > 0
      ? daysNum
      : undefined
  const sources = await getDomainSources(domainId, daysFilter)
  return NextResponse.json({ data: sources })
}
