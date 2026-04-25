import { getReportDomainOptions } from '@/services/reports'
import { parseDateParams } from '@/utils/api'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const { from, to } = parseDateParams(searchParams)
  const items = await getReportDomainOptions(from, to)
  return NextResponse.json({ data: items })
}
