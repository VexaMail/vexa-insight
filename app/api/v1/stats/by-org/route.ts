import { withApiAuth } from '@/services/api'
import { getVolumeByOrg } from '@/services/reports'
import { dateRangeQuerySchema } from '@/validators/query'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const GET = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const { from, to } = dateRangeQuerySchema.parse(
      Object.fromEntries(new URL(request.url).searchParams),
    )
    const data = await getVolumeByOrg(from, to)
    return NextResponse.json({ data })
  },
)
