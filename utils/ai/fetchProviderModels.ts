import type {
  FetchModelsArgs,
  FetchModelsResult,
  ProviderModelInfo,
} from '@/types/ai'

export async function fetchProviderModels({
  apiKey,
  providerId,
  temporaryApiKey,
  signal,
}: FetchModelsArgs): Promise<FetchModelsResult> {
  const res = await fetch('/api/v1/admin/ai-models', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey,
    },
    body: JSON.stringify({
      providerId,
      ...(temporaryApiKey.trim() ? { apiKey: temporaryApiKey.trim() } : {}),
    }),
    signal,
  })
  if (!res.ok) {
    const json = (await res.json()) as { error: { message: string } }
    return { models: [], error: json.error.message }
  }
  const json = (await res.json()) as { data: ProviderModelInfo[] }
  return { models: json.data, error: null }
}
