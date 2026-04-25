import { checkProviderApiKey, updateAiSettings } from '@/services/ai'
import { requireAdminAuth } from '@/services/api'
import { getConfig } from '@/services/config'
import { getAiSettingsPublic } from '@/services/settings'
import type { AIProviderId } from '@/types/ai'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
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

  const parsed = body as {
    providerId?: string | null
    apiKey?: string | null
    model?: string | null
  }

  const validProviders = ['anthropic', 'gemini', 'openai', 'openrouter']

  if (
    parsed.providerId !== undefined &&
    parsed.providerId !== null &&
    !validProviders.includes(parsed.providerId)
  ) {
    return NextResponse.json(
      { error: { code: 'VALIDATION_ERROR', message: 'Invalid AI provider' } },
      { status: 400 },
    )
  }

  const config = getConfig()

  if (parsed.apiKey && parsed.providerId) {
    const isValid = await checkProviderApiKey(
      parsed.providerId as AIProviderId,
      parsed.apiKey,
    )
    if (!isValid) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'API key validation failed. Check the key and try again.',
          },
        },
        { status: 400 },
      )
    }
  }

  updateAiSettings(
    (parsed.providerId as AIProviderId) ?? null,
    parsed.apiKey ?? null,
    config.secretKey,
    parsed.model,
  )

  const data = getAiSettingsPublic()
  return NextResponse.json({ data })
}
