import type { ProviderModelInfo } from '../../contracts/ProviderModelInfo'
import { deduplicateProviderModels } from '../shared/normalize/deduplicateProviderModels'
import { normalizeProviderModel } from '../shared/normalize/normalizeProviderModel'
import { sortProviderModels } from '../shared/normalize/sortProviderModels'

/**
 * Fetches available text models from OpenRouter /api/v1/models.
 */
export async function fetchOpenRouterModels(
  apiKey: string,
): Promise<ProviderModelInfo[]> {
  const response = await fetch(
    'https://openrouter.ai/api/v1/models?output_modalities=text',
    {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(15_000),
    },
  )

  if (!response.ok) {
    throw new Error(`OpenRouter models API returned ${String(response.status)}`)
  }

  const json = (await response.json()) as {
    data: { id: string; name: string; description?: string }[]
  }

  const raw = json.data.map((m) =>
    normalizeProviderModel({
      id: m.id,
      name: m.name || m.id,
      providerId: 'openrouter',
      description: m.description,
    }),
  )

  const deduped = deduplicateProviderModels(raw)
  return sortProviderModels(deduped)
}
