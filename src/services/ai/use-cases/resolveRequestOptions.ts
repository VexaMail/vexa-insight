import type { AiRequestOverrides, ProviderRequestOptions } from '../contracts'
import { AI_REQUEST_TIMEOUT_MS } from '../core/aiRequestTimeoutMs'

/** Fills the provider options from the overrides and the use case's defaults. */
export function resolveRequestOptions(
  overrides: AiRequestOverrides,
  defaultMaxTokens: number,
): ProviderRequestOptions {
  return {
    timeoutMs: overrides.timeoutMs ?? AI_REQUEST_TIMEOUT_MS,
    maxTokens: overrides.maxTokens ?? defaultMaxTokens,
    temperature: overrides.temperature ?? 0.2,
  }
}
