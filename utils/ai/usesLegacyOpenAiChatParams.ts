import { LEGACY_OPENAI_CHAT_MODEL_PREFIXES } from '@/constants/ai'

/**
 * Whether an OpenAI model takes the pre-reasoning chat parameters
 * (`max_tokens` plus a non-default `temperature`) rather than the reasoning
 * models' `max_completion_tokens` with no sampling controls.
 *
 * Unknown models get the modern shape: OpenAI's recent releases are reasoning
 * models, so guessing "legacy" for an unrecognised id is the guess that fails
 * the call.
 */
export function usesLegacyOpenAiChatParams(model: string): boolean {
  const normalized = model.trim().toLowerCase()

  return LEGACY_OPENAI_CHAT_MODEL_PREFIXES.some((prefix) =>
    normalized.startsWith(prefix),
  )
}
