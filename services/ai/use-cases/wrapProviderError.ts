import type { AIServiceError } from '../contracts'

/**
 * Wraps an unknown provider error into a typed AIServiceError.
 */
export function wrapProviderError(err: unknown): AIServiceError {
  if (err && typeof err === 'object' && 'code' in err) {
    return err as AIServiceError
  }
  if (err instanceof Error && err.name === 'TimeoutError') {
    return {
      code: 'TIMEOUT',
      message: 'Analysis took too long. Please try again.',
    }
  }
  return {
    code: 'PROVIDER_UNAVAILABLE',
    message: 'Unable to reach the AI service. Check your network connection.',
    providerMessage: err instanceof Error ? err.message : String(err),
  }
}
