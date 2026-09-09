import { checkProviderApiKey } from '@/services/ai'
import { NextResponse } from 'next/server'
import type { AiSettingsUpdateInput } from './AiSettingsUpdateInput'

/** A 400 when a new key was given and the provider rejects it, else null. */
export async function rejectInvalidApiKey(
  data: AiSettingsUpdateInput,
): Promise<NextResponse | null> {
  if (!data.apiKey || !data.providerId) return null
  const isValid = await checkProviderApiKey(data.providerId, data.apiKey)
  if (isValid) return null
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
