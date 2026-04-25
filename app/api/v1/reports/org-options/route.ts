import { getReportOrgOptions } from '@/services/reports'
import { parseDateParams } from '@/utils/api'
import { coerceNumber } from '@/utils/validation'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const domainId = coerceNumber(searchParams.get('domainId'))
  const { from, to } = parseDateParams(searchParams)
  const items = await getReportOrgOptions(domainId ?? undefined, from, to)
  return NextResponse.json({ data: items })
}
