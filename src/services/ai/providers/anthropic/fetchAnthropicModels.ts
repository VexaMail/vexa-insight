import type { ProviderModelInfo } from '../../contracts/ProviderModelInfo'
import { deduplicateProviderModels } from '../shared/normalize/deduplicateProviderModels'
import { normalizeProviderModel } from '../shared/normalize/normalizeProviderModel'
import { sortProviderModels } from '../shared/normalize/sortProviderModels'

/**
 * Fetches available models from Anthropic /v1/models.
 */
export async function fetchAnthropicModels(
  apiKey: string,
): Promise<ProviderModelInfo[]> {
  const allModels: ProviderModelInfo[] = []
  let hasMore = true
  let afterId: string | undefined

  while (hasMore) {
    const url = new URL('https://api.anthropic.com/v1/models')
    url.searchParams.set('limit', '100')
    if (afterId) {
      url.searchParams.set('after_id', afterId)
    }

    const response = await fetch(url.toString(), {
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      signal: AbortSignal.timeout(15_000),
    })

    if (!response.ok) {
      throw new Error(
        `Anthropic models API returned ${String(response.status)}`,
      )
    }

    const json = (await response.json()) as {
      data: { id: string; display_name: string; type: string }[]
      has_more: boolean
      last_id: string | null
    }

    for (const m of json.data) {
      allModels.push(
        normalizeProviderModel(m.id, m.display_name || m.id, 'anthropic'),
      )
    }

    hasMore = json.has_more
    afterId = json.last_id ?? undefined
  }

  const deduped = deduplicateProviderModels(allModels)
  return sortProviderModels(deduped)
}
