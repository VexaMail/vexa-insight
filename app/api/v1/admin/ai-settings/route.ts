import { updateAiSettings } from '@/services/ai'
import { requireAdminAuth } from '@/services/api'
import { getConfig } from '@/services/config'
import { getAiSettingsPublic } from '@/services/settings'
import { aiSettingsUpdateSchema } from '@/validators/ai'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { rejectInvalidApiKey } from './rejectInvalidApiKey'

export function GET(request: NextRequest): NextResponse {
  const auth = requireAdminAuth(request)
  if (auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }
  const data = getAiSettingsPublic()
  return NextResponse.json({ data })
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
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

  const parsed = aiSettingsUpdateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: parsed.error.issues[0]?.message ?? 'Invalid AI settings',
        },
      },
      { status: 400 },
    )
  }

  const rejected = await rejectInvalidApiKey(parsed.data)
  if (rejected) return rejected

  updateAiSettings(
    parsed.data.providerId ?? null,
    parsed.data.apiKey ?? null,
    getConfig().secretKey,
    parsed.data.model,
  )

  const data = getAiSettingsPublic()
  return NextResponse.json({ data })
}
