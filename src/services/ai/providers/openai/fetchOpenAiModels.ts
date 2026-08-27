import type { ProviderModelInfo } from '../../contracts/ProviderModelInfo'
import { deduplicateProviderModels } from '../shared/normalize/deduplicateProviderModels'
import { filterProviderModels } from '../shared/normalize/filterProviderModels'
import { normalizeProviderModel } from '../shared/normalize/normalizeProviderModel'
import { sortProviderModels } from '../shared/normalize/sortProviderModels'
import { OPENAI_CHAT_INCLUDE } from './openaiChatIncludePatterns'
import { OPENAI_EXCLUDE } from './openaiExcludePatterns'

/**
 * Fetches available chat models from OpenAI /v1/models.
 */
export async function fetchOpenAiModels(
  apiKey: string,
): Promise<ProviderModelInfo[]> {
  const response = await fetch('https://api.openai.com/v1/models', {
    headers: { Authorization: `Bearer ${apiKey}` },
    signal: AbortSignal.timeout(15_000),
  })

  if (!response.ok) {
    throw new Error(`OpenAI models API returned ${String(response.status)}`)
  }

  const json = (await response.json()) as {
    data: { id: string; owned_by: string }[]
  }

  const raw = json.data.map((m) => normalizeProviderModel(m.id, m.id, 'openai'))

  const filtered = filterProviderModels(
    raw,
    OPENAI_CHAT_INCLUDE,
    OPENAI_EXCLUDE,
  )
  const deduped = deduplicateProviderModels(filtered)
  return sortProviderModels(deduped)
}
