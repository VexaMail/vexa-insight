import { getSettingsRow } from '@/services/settings'
import type { AIProviderAdapter, AIServiceError } from '../contracts'
import { createAnthropicAdapter } from '../providers/anthropic/createAnthropicAdapter'
import { createGeminiAdapter } from '../providers/gemini/createGeminiAdapter'
import { createOpenAiAdapter } from '../providers/openai/createOpenAiAdapter'
import { createOpenRouterAdapter } from '../providers/openrouter/createOpenRouterAdapter'
import { decryptApiKey } from '../settings/decryptApiKey'
import { getAiSettings } from '../settings/getAiSettings'

/**
 * Resolves the configured AI provider into a ready-to-use adapter.
 * Reads settings, decrypts the API key, and returns the adapter.
 * Throws AIServiceError if AI is not configured or decryption fails.
 */
export function resolveProvider(): AIProviderAdapter {
  const aiSettings = getAiSettings()
  if (!aiSettings) {
    const error: AIServiceError = {
      code: 'NOT_CONFIGURED',
      message: 'AI is not configured. Please set up a provider in Settings.',
    }
    throw error
  }

  const settingsRow = getSettingsRow()
  if (!settingsRow) {
    const error: AIServiceError = {
      code: 'NOT_CONFIGURED',
      message: 'Application settings not found.',
    }
    throw error
  }

  const apiKey = decryptApiKey(
    aiSettings.apiKeyEncrypted,
    aiSettings.apiKeyIv,
    settingsRow.secretKey,
  )
  if (!apiKey) {
    const error: AIServiceError = {
      code: 'UNAUTHORIZED',
      message:
        'Failed to decrypt AI API key. Please re-enter your key in Settings.',
    }
    throw error
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
