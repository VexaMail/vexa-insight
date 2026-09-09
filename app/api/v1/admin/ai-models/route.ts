import { fetchProviderModels } from '@/services/ai'
import { requireAdminAuth } from '@/services/api'
import { aiModelsRequestSchema } from '@/validators/ai'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { resolveModelsApiKey } from './resolveModelsApiKey'
import { validationErrorResponse } from './validationErrorResponse'

/**
 * POST /api/v1/admin/ai-models
 *
 * Fetches the available model catalog from a provider API.
 * Accepts an optional apiKey in the body; falls back to the DB-stored key.
 */
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

  const parsed = aiModelsRequestSchema.safeParse(body)
  if (!parsed.success) {
    return validationErrorResponse(
      parsed.error.issues[0]?.message ?? 'A valid providerId is required',
    )
  }

  const providerId = parsed.data.providerId
  const apiKey = resolveModelsApiKey(parsed.data.apiKey)
  if (!apiKey) {
    return validationErrorResponse(
      'No API key provided and no saved key found. Enter an API key first.',
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
