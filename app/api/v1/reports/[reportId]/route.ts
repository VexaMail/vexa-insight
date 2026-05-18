import { withApiAuth } from '@/services/api'
import { getReportById } from '@/services/reports'
import { parseIdParam } from '@/utils/api'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const GET = withApiAuth(
  async (
    _request: NextRequest,
    context: { params: Promise<{ reportId: string }> },
  ): Promise<NextResponse> => {
    const { reportId: segment } = await context.params
    const reportId = parseIdParam(segment)
    if (reportId == null) {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'Invalid report id' } },
        { status: 400 },
      )
    }
    const report = await getReportById(reportId)
    if (report == null) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Report not found' } },
        { status: 404 },
      )
    }
    return NextResponse.json({ data: report })
  },
)
