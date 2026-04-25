import type { AIProviderId } from './AiProviderId'

/**
 * AI provider settings shape returned to the client (key masked).
 */
export type AIProviderSettingsPublic = {
  providerId: AIProviderId | null
  apiKeyMasked: string | null
  model: string | null
  isConfigured: boolean
}
