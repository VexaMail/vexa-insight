import type {
  AIProviderAdapter,
  ProviderRawResponse,
  ProviderRequestOptions,
} from '../contracts'
import { wrapProviderError } from './wrapProviderError'

/** One provider call, with transport failures mapped to AI service errors. */
export async function requestCompletion(
  adapter: AIProviderAdapter,
  systemPrompt: string,
  userPrompt: string,
  options: ProviderRequestOptions,
): Promise<ProviderRawResponse> {
  try {
    return await adapter.complete(systemPrompt, userPrompt, options)
  } catch (err: unknown) {
    throw wrapProviderError(err)
  }
}
