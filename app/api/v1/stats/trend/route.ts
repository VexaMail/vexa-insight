import { withApiAuth } from '@/services/api'
import { getTrendStats } from '@/services/reports'
import { parseDateParams } from '@/utils/api'
import { getFromDateFromDays } from '@/utils/dates'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const GET = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const { searchParams } = new URL(request.url)
    const period = (searchParams.get('period') ?? 'day') as
      'hour' | 'day' | 'week'
    if (period !== 'hour' && period !== 'day' && period !== 'week') {
      return NextResponse.json(
        {
          error: {
            code: 'BAD_REQUEST',
            message: 'period must be hour, day, or week',
          },
        },
        { status: 400 },
      )
    }
    const { from: fromParam, to: toParam } = parseDateParams(searchParams)
    const days = Math.min(
      3650,
      Math.max(1, parseInt(searchParams.get('days') ?? '30', 10) || 30),
    )
    const from =
      fromParam ?? getFromDateFromDays(new Date(), days) ?? new Date()
    const data = await getTrendStats(period, from, toParam)
    return NextResponse.json({ data })
  },
)
