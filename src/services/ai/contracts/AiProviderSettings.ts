import type { AIProviderId } from './AiProviderId'

export type AIProviderSettings = {
  providerId: AIProviderId
  apiKeyEncrypted: string
  apiKeyIv: string
  model: string | null
  updatedAt: Date
}
