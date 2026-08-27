import type { AIProviderId } from '../../contracts/AiProviderId'
import type { ProviderModelInfo } from '../../contracts/ProviderModelInfo'
import { fetchAnthropicModels } from '../anthropic/fetchAnthropicModels'
import { fetchGeminiModels } from '../gemini/fetchGeminiModels'
import { fetchOpenAiModels } from '../openai/fetchOpenAiModels'
import { fetchOpenRouterModels } from '../openrouter/fetchOpenRouterModels'

/**
 * Maps each provider to its model-fetching function.
 *
 * When adding a new provider, register its fetcher here.
 */
export const providerModelFetchers: Record<
  AIProviderId,
  (apiKey: string) => Promise<ProviderModelInfo[]>
> = {
  openai: fetchOpenAiModels,
  anthropic: fetchAnthropicModels,
  gemini: fetchGeminiModels,
  openrouter: fetchOpenRouterModels,
}
