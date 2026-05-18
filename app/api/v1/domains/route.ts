import { withApiAuth } from '@/services/api'
import { getDomains } from '@/services/reports'
import { NextResponse } from 'next/server'

export const GET = withApiAuth(async (): Promise<NextResponse> => {
  const domains = await getDomains()
  return NextResponse.json({ data: domains })
})
