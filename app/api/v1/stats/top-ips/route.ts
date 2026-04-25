import { getTopIpSenders } from '@/services/reports'
import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
  const data = await getTopIpSenders(15)
  return NextResponse.json({ data })
}
