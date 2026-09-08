import type { AIProviderId } from '@/types/ai'

/** Field handlers returned by the AI settings form hook. */
export type AiSettingsFieldHandlers = {
  handleProviderChange: (providerId: AIProviderId | null) => void
  handleApiKeyChange: (value: string) => void
  handleModelChange: (value: string) => void
}
