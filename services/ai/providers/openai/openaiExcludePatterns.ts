/**
 * Exclusion patterns for non-chat OpenAI models.
 */
export const OPENAI_EXCLUDE = [
  /^gpt-.*-realtime/,
  /^gpt-.*-tts/,
  /^gpt-.*-transcribe/,
  /^gpt-image-/,
]
