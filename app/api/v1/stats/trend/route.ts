import { withApiAuth } from '@/services/api'
import { getTrendStats } from '@/services/reports'
import { getFromDateFromDays } from '@/utils/dates'
import {
  dateRangeQuerySchema,
  trendDaysQuerySchema,
  trendPeriodQuerySchema,
} from '@/validators/query'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const GET = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const { searchParams } = new URL(request.url)
    const period = trendPeriodQuerySchema.safeParse(
      searchParams.get('period') ?? undefined,
    )
    if (!period.success) {
      return NextResponse.json(
        {
          error: {
            code: 'BAD_REQUEST',
            message:
              period.error.issues[0]?.message ??
              'period must be hour, day, or week',
          },
        },
        { status: 400 },
      )
    }
    const { from: fromParam, to: toParam } = dateRangeQuerySchema.parse(
      Object.fromEntries(searchParams),
    )
    const days = trendDaysQuerySchema.parse(
      searchParams.get('days') ?? undefined,
    )
    const from =
      fromParam ?? getFromDateFromDays(new Date(), days) ?? new Date()
    const data = await getTrendStats(period.data, from, toParam)
    return NextResponse.json({ data })
  },
)
