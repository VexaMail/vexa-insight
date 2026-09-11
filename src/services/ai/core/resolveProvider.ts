import { resolveSecretKey } from '@/services/settings-store'
import type { AIProviderAdapter } from '../contracts'
import { createAnthropicAdapter } from '../providers/anthropic/createAnthropicAdapter'
import { createGeminiAdapter } from '../providers/gemini/createGeminiAdapter'
import { createOpenAiAdapter } from '../providers/openai/createOpenAiAdapter'
import { createOpenRouterAdapter } from '../providers/openrouter/createOpenRouterAdapter'
import { decryptApiKey } from '../settings/decryptApiKey'
import { getAiSettings } from '../settings/getAiSettings'
import { AIServiceErrorException } from './AiServiceErrorException'

/**
 * Resolves the configured AI provider into a ready-to-use adapter.
 * Reads settings, decrypts the API key, and returns the adapter.
 * Throws AIServiceError if AI is not configured or decryption fails.
 */
export function resolveProvider(): AIProviderAdapter {
  const aiSettings = getAiSettings()
  if (!aiSettings) {
    throw new AIServiceErrorException(
      'NOT_CONFIGURED',
      'AI is not configured. Please set up a provider in Settings.',
    )
  }

  const secretKey = resolveSecretKey()
  if (!secretKey) {
    throw new AIServiceErrorException(
      'NOT_CONFIGURED',
      'Application settings not found.',
    )
  }

  const apiKey = decryptApiKey(
    aiSettings.apiKeyEncrypted,
    aiSettings.apiKeyIv,
    secretKey,
  )
  if (!apiKey) {
    throw new AIServiceErrorException(
      'UNAUTHORIZED',
      'Failed to decrypt AI API key. Please re-enter your key in Settings.',
    )
  }

  const factories = {
    openai: createOpenAiAdapter,
    openrouter: createOpenRouterAdapter,
    anthropic: createAnthropicAdapter,
    gemini: createGeminiAdapter,
  } as const

  const factory = factories[aiSettings.providerId]
  return factory(apiKey, aiSettings.model)
}
