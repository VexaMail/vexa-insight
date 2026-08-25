import { requireAdminAuth } from '@/services/api'
import {
  checkAndRecoverStuckJob,
  getPollStatus,
  runIngestJob,
} from '@/services/job'
import { checkRateLimit, getRateLimitKey } from '@/utils/rateLimit'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { parseFullRescanFlag } from './parseFullRescanFlag'
import { TRIGGER_LIMIT } from './triggerLimit'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const TRIGGER_WINDOW_MS = 60_000
  const auth = requireAdminAuth(request)
  if (auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }
  const key = getRateLimitKey(request)
  if (!checkRateLimit(key, TRIGGER_LIMIT, TRIGGER_WINDOW_MS)) {
    return NextResponse.json(
      { error: { code: 'TOO_MANY_REQUESTS', message: 'Rate limit exceeded' } },
      { status: 429 },
    )
  }
  const fullRescan = await parseFullRescanFlag(request)
  await checkAndRecoverStuckJob()
  const status = await getPollStatus()
  if (status.isRunning) {
    return NextResponse.json(
      {
        error: {
          code: 'CONFLICT',
          message: 'Ingest job is already running',
        },
      },
      { status: 409 },
    )
  }
  // Run the job in the background (fire and forget)
  // This ensures the process is decoupled from the browser connection/HTTP request.
  void (async () => {
    try {
      await runIngestJob({ fullRescan })
    } catch (err) {
      console.error('[ingest] Background job failed:', err)
      // The finally block inside runIngestJob will still clear the flag,
      // but if it fails completely outside that logic, we ensure it's recorded.
      try {
        const { setPollStatusInDb } = await import('@/services/job')
        await setPollStatusInDb({
          isRunning: false,
          lastCheck: new Date(),
        })
      } catch (fallbackErr) {
        console.error(fallbackErr)
      }
    }
  })()

  return NextResponse.json(
    {
      data: {
        success: true,
        message: fullRescan
          ? 'Full rescan started in background'
          : 'Job started in background',
      },
    },
    { status: 202 },
  )
}
