import { withApiAuth } from '@/services/api'
import { getReportIds } from '@/services/reports'
import { NextResponse } from 'next/server'

export const GET = withApiAuth(async (): Promise<NextResponse> => {
  const data = await getReportIds()
  return NextResponse.json({ data })
})
