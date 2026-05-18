import { withApiAuth } from '@/services/api'
import { getTopIpSenders } from '@/services/reports'
import { NextResponse } from 'next/server'

export const GET = withApiAuth(async (): Promise<NextResponse> => {
  const data = await getTopIpSenders(15)
  return NextResponse.json({ data })
})
