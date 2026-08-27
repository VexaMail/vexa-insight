import type { AIProviderId } from '@/types/ai'

/**
 * Validates an AI provider API key by making a lightweight health-check call.
 * Returns true if the key is valid, false otherwise.
 */
export async function validateProviderApiKey(
  providerId: AIProviderId,
  apiKey: string,
): Promise<boolean> {
  try {
    const endpointMap: Record<
      AIProviderId,
      { url: string; headers: Record<string, string> }
    > = {
      openai: {
        url: 'https://api.openai.com/v1/models',
        headers: { Authorization: `Bearer ${apiKey}` },
      },
      openrouter: {
        url: 'https://openrouter.ai/api/v1/models',
        headers: { Authorization: `Bearer ${apiKey}` },
      },
      anthropic: {
        url: 'https://api.anthropic.com/v1/messages',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
      },
      gemini: {
        url: `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
        headers: {},
      },
    }

    const config = endpointMap[providerId]
    const response = await fetch(config.url, {
      method: 'GET',
      headers: config.headers,
      signal: AbortSignal.timeout(10_000),
    })

    return response.ok || response.status === 405
  } catch {
    return false
  }
}
