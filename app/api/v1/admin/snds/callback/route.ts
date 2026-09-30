import { requireAdminAuth } from '@/services/api'
import { getConfig } from '@/services/config'
import {
  completeSndsAuthorization,
  getSndsConnectionPublic,
  syncSnds,
} from '@/services/snds'
import { sndsCallbackSchema } from '@/validators/snds'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const auth = requireAdminAuth(request)
  if (auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: { code: 'BAD_REQUEST', message: 'Invalid JSON body' } },
      { status: 400 },
    )
  }
  const parsed = sndsCallbackSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: parsed.error.issues[0]?.message ?? 'Invalid body',
        },
      },
      { status: 400 },
    )
  }

  const { secretKey } = getConfig()
  const result = await completeSndsAuthorization(
    parsed.data.redirectUrl,
    secretKey,
  )
  if (!result.ok) {
    return NextResponse.json(
      { error: { code: 'SNDS_AUTH_FAILED', message: result.error } },
      { status: 400 },
    )
  }
  const sync = await syncSnds(secretKey)
  return NextResponse.json({
    data: { connection: getSndsConnectionPublic(), sync },
  })
}
