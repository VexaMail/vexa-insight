import type { AIProviderId } from '../../contracts'
import { AIServiceErrorException } from '../../core/AiServiceErrorException'

export function mapProviderError(
  providerId: AIProviderId,
  status: number,
  body: string,
): AIServiceErrorException {
  if (status === 401 || status === 403) {
    return new AIServiceErrorException(
      'UNAUTHORIZED',
      'AI service configuration error. Please check your API key in Settings.',
      `${providerId} returned ${String(status)}: ${body.slice(0, 200)}`,
    )
  }
  if (status === 429) {
    return new AIServiceErrorException(
      'RATE_LIMITED',
      'AI service is busy. Please try again in a moment.',
      `${providerId} returned 429: ${body.slice(0, 200)}`,
    )
  }
  if (status >= 500) {
    return new AIServiceErrorException(
      'PROVIDER_UNAVAILABLE',
      'AI service temporarily unavailable. Please try again later.',
      `${providerId} returned ${String(status)}: ${body.slice(0, 200)}`,
    )
  }
  return new AIServiceErrorException(
    'UNKNOWN',
    'An unexpected error occurred with the AI service.',
    `${providerId} returned ${String(status)}: ${body.slice(0, 200)}`,
  )
}
