import { checkDb, checkIngestFreshness } from '@/services/health'
import { NextResponse } from 'next/server'

// The status code answers only "is the database reachable", because
// readiness and liveness probes use it and a stalled scheduler must not take
// the UI out of service. `ingest` is for monitors that alert on its value.
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
  const ingest = await checkIngestFreshness()
  return NextResponse.json({ data: { status: 'ok', ingest } })
}
