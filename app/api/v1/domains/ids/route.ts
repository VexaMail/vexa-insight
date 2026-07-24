import { withApiAuth } from '@/services/api'
import { getDomainIds } from '@/services/reports'
import { NextResponse } from 'next/server'

export const GET = withApiAuth(async (): Promise<NextResponse> => {
  const data = await getDomainIds()
  return NextResponse.json({ data })
})
