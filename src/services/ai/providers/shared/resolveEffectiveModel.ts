import type { AIProviderId } from '../../contracts/AiProviderId'
import { AIServiceErrorException } from '../../core/AiServiceErrorException'

/**
 * Resolves the effective model ID for runtime execution.
 *
 * Rules:
 * 1. If selectedModel is set and non-empty, use it (trimmed).
 * 2. Otherwise, throw AIServiceError (NOT_CONFIGURED) — never fall back to an
 *    implicit provider default silently.
 */
export function resolveEffectiveModel(
  providerId: AIProviderId,
  selectedModel: string | null | undefined,
): string {
  if (selectedModel && selectedModel.trim().length > 0) {
    return selectedModel.trim()
  }

  throw new AIServiceErrorException(
    'NOT_CONFIGURED',
    `AI model is not configured for provider "${providerId}". Select a model in Settings > AI Provider.`,
  )
}
