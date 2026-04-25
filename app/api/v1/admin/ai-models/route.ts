import { fetchProviderModels, resolveStoredApiKey } from '@/services/ai'
import { requireAdminAuth } from '@/services/api'
import type { AIProviderId } from '@/types/ai'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * POST /api/v1/admin/ai-models
 *
 * Fetches the available model catalog from a provider API.
 * Accepts an optional apiKey in the body; falls back to the DB-stored key.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const VALID_PROVIDERS = ['anthropic', 'gemini', 'openai', 'openrouter']
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

  const parsed = body as { providerId?: string; apiKey?: string }

  if (!parsed.providerId || !VALID_PROVIDERS.includes(parsed.providerId)) {
    return NextResponse.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'A valid providerId is required',
        },
      },
      { status: 400 },
    )
  }

  const providerId = parsed.providerId as AIProviderId
  let apiKey = parsed.apiKey?.trim() ?? ''

  if (!apiKey) {
    apiKey = resolveStoredApiKey()
  }

  if (!apiKey) {
    return NextResponse.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message:
            'No API key provided and no saved key found. Enter an API key first.',
        },
      },
      { status: 400 },
    )
  }

  try {
    const models = await fetchProviderModels(providerId, apiKey)
    return NextResponse.json({ data: models })
  } catch (err) {
    console.error(`[ai:models] failed to fetch models for ${providerId}:`, err)
    return NextResponse.json(
      {
        error: {
          code: 'PROVIDER_ERROR',
          message: 'Failed to fetch models from provider. Check your API key.',
        },
      },
      { status: 502 },
    )
  }
}
