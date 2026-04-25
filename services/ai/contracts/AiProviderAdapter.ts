import type { AIProviderId } from './AiProviderId'
import type { ProviderRawResponse } from './ProviderRawResponse'
import type { ProviderRequestOptions } from './ProviderRequestOptions'

export type AIProviderAdapter = {
  readonly providerId: AIProviderId

  complete(
    systemPrompt: string,
    userPrompt: string,
    options: ProviderRequestOptions,
  ): Promise<ProviderRawResponse>
}
