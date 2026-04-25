import { getAggregateStats } from '@/services/reports'
import { parseDateParams } from '@/utils/api'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { from, to } = parseDateParams(new URL(request.url).searchParams)
  const stats = await getAggregateStats(from, to)
  return NextResponse.json({ data: stats })
}
