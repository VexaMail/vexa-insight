import type { ProviderModelInfo } from '../../contracts/ProviderModelInfo'
import { deduplicateProviderModels } from '../shared/normalize/deduplicateProviderModels'
import { filterProviderModels } from '../shared/normalize/filterProviderModels'
import { normalizeProviderModel } from '../shared/normalize/normalizeProviderModel'
import { sortProviderModels } from '../shared/normalize/sortProviderModels'
import { GEMINI_EXCLUDE } from './geminiExcludePatterns'

/**
 * Fetches available models from Gemini /v1beta/models.
 * Keeps only models that support `generateContent`.
 */
export async function fetchGeminiModels(
  apiKey: string,
): Promise<ProviderModelInfo[]> {
  const allModels: ProviderModelInfo[] = []
  let pageToken: string | undefined

  do {
    const url = new URL(
      'https://generativelanguage.googleapis.com/v1beta/models',
    )
    url.searchParams.set('key', apiKey)
    url.searchParams.set('pageSize', '100')
    if (pageToken) {
      url.searchParams.set('pageToken', pageToken)
    }

    const response = await fetch(url.toString(), {
      signal: AbortSignal.timeout(15_000),
    })

    if (!response.ok) {
      throw new Error(`Gemini models API returned ${String(response.status)}`)
    }

    const json = (await response.json()) as {
      models: {
        name: string
        displayName: string
        description?: string
        supportedGenerationMethods: string[]
      }[]
      nextPageToken?: string
    }

    for (const m of json.models) {
      if (!m.supportedGenerationMethods.includes('generateContent')) continue

      const id = m.name.replace(/^models\//, '')
      allModels.push(
        normalizeProviderModel(
          id,
          m.displayName || id,
          'gemini',
          m.description,
        ),
      )
    }

    pageToken = json.nextPageToken
  } while (pageToken)

  const filtered = filterProviderModels(allModels, undefined, GEMINI_EXCLUDE)
  const deduped = deduplicateProviderModels(filtered)
  return sortProviderModels(deduped)
}
