import type { AIProviderId } from './AiProviderId'

/** Raw model fields as a provider's model list returns them. */
export type NormalizeProviderModelInput = {
  id: string
  name: string
  providerId: AIProviderId
  description?: string | undefined
  deprecated?: boolean | undefined
}
