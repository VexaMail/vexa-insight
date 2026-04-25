import type { AIProviderId } from '../../contracts/AiProviderId'

/**
 * Hardcoded provider defaults used as runtime safety-net fallbacks.
 */
export const PROVIDER_DEFAULTS: Record<AIProviderId, string> = {
  openai: 'gpt-4o',
  anthropic: 'claude-sonnet-4-6',
  gemini: 'gemini-2.5-flash',
  openrouter: 'openrouter/auto',
}
