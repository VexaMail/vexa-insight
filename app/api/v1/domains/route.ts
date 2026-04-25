import { getDomains } from '@/services/reports'
import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
  const domains = await getDomains()
  return NextResponse.json({ data: domains })
}
