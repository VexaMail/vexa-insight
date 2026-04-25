import { requireAdminAuth } from '@/services/api'
import { setPollStatusInDb } from '@/services/job'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * Requests the running ingest job to stop and clears isRunning so the UI
 * can update on the next poll. Protected by API key.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const auth = requireAdminAuth(request)
  if (auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }
  await setPollStatusInDb({ abortRequested: true, isRunning: false })
  return NextResponse.json({ data: { message: 'Abort requested' } })
}
