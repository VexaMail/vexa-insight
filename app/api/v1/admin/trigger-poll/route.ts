import { requireAdminAuth } from '@/services/api'
import {
  checkAndRecoverStuckJob,
  getPollStatus,
  runIngestJobDetached,
} from '@/services/job'
import { checkRateLimit, getRateLimitKey } from '@/utils/rateLimit'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { parseFullRescanFlag } from './parseFullRescanFlag'
import { TRIGGER_LIMIT } from './triggerLimit'
import { TRIGGER_WINDOW_MS } from './triggerWindowMs'

export async function POST(request: NextRequest): Promise<NextResponse> {
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
  runIngestJobDetached(fullRescan)

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
