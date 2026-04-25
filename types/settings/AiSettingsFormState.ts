import type { AIProviderId } from '@/types/ai'

export type AiSettingsFormState = {
  providerId: AIProviderId | null
  apiKey: string
  model: string
}
