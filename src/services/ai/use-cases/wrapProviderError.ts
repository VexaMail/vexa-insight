import type { AIServiceError } from '../contracts'
import { AIServiceErrorException } from '../core/AiServiceErrorException'

/**
 * Wraps an unknown provider error into a typed AIServiceError.
 */
export function wrapProviderError(err: unknown): AIServiceErrorException {
  if (err instanceof AIServiceErrorException) {
    return err
  }
  if (err && typeof err === 'object' && 'code' in err) {
    const aiError = err as AIServiceError
    return new AIServiceErrorException(
      aiError.code,
      aiError.message,
      aiError.providerMessage,
    )
  }
  if (err instanceof Error && err.name === 'TimeoutError') {
    return new AIServiceErrorException(
      'TIMEOUT',
      'Analysis took too long. Please try again.',
    )
  }
  return new AIServiceErrorException(
    'PROVIDER_UNAVAILABLE',
    'Unable to reach the AI service. Check your network connection.',
    err instanceof Error ? err.message : String(err),
  )
}
