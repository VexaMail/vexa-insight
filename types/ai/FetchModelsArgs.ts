import type { AIProviderId } from './AiProviderId'

export type FetchModelsArgs = {
  apiKey: string
  providerId: AIProviderId
  temporaryApiKey: string
  signal: AbortSignal
}
