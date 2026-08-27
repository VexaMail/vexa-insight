import type { AIProviderId } from './AiProviderId'

/**
 * Normalized model entry returned by any AI provider's model listing API.
 */
export type ProviderModelInfo = {
  id: string
  name: string
  providerId: AIProviderId
  description?: string
  deprecated?: boolean
}
