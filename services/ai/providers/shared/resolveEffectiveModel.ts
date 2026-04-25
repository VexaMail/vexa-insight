import type { AIProviderId } from '../../contracts/AiProviderId'
import { PROVIDER_DEFAULTS } from './providerDefaults'

/**
 * Resolves the effective model ID for runtime execution.
 *
 * Rules:
 * 1. If selectedModel is set and non-empty, use it.
 * 2. Otherwise, fall back to the provider's hardcoded default.
 */
export function resolveEffectiveModel(
  providerId: AIProviderId,
  selectedModel: string | null | undefined,
): string {
  if (selectedModel && selectedModel.trim().length > 0) {
    return selectedModel.trim()
  }

  const fallback = PROVIDER_DEFAULTS[providerId]
  console.info(
    `[ai:models] no model selected for ${providerId}, using fallback: ${fallback}`,
  )
  return fallback
}
