import type { AIProviderId } from '@/types/ai'

export type AiProviderSelectProps = {
  readonly value: AIProviderId | null
  readonly onChange: (providerId: AIProviderId | null) => void
}
