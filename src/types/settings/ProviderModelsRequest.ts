import type { AIProviderId } from '@/types/ai'

/** What identifies one models request to the provider API. */
export type ProviderModelsRequest = {
  readonly apiKey: string
  readonly providerId: AIProviderId | null
  readonly temporaryApiKey: string
}
