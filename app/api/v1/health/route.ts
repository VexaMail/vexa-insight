import { checkDb } from '@/services/health'
import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
  const ok = await checkDb()
  if (!ok) {
    return NextResponse.json(
      {
        error: { code: 'SERVICE_UNAVAILABLE', message: 'Database unavailable' },
      },
      { status: 503 },
    )
  }
  return NextResponse.json({ data: { status: 'ok' } })
}
