import type { AIProviderId, AIServiceError } from '../../contracts'

export function mapProviderError(
  providerId: AIProviderId,
  status: number,
  body: string,
): AIServiceError {
  if (status === 401 || status === 403) {
    return {
      code: 'UNAUTHORIZED',
      message:
        'AI service configuration error. Please check your API key in Settings.',
      providerMessage: `${providerId} returned ${status}: ${body.slice(0, 200)}`,
    }
  }
  if (status === 429) {
    return {
      code: 'RATE_LIMITED',
      message: 'AI service is busy. Please try again in a moment.',
      providerMessage: `${providerId} returned 429: ${body.slice(0, 200)}`,
    }
  }
  if (status >= 500) {
    return {
      code: 'PROVIDER_UNAVAILABLE',
      message: 'AI service temporarily unavailable. Please try again later.',
      providerMessage: `${providerId} returned ${status}: ${body.slice(0, 200)}`,
    }
  }
  return {
    code: 'UNKNOWN',
    message: 'An unexpected error occurred with the AI service.',
    providerMessage: `${providerId} returned ${status}: ${body.slice(0, 200)}`,
  }
}
