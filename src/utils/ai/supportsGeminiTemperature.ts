import { TEMPERATURE_CAPABLE_GEMINI_MODEL_PREFIXES } from '@/constants/ai'

/**
 * Whether a Gemini model should receive the `temperature` request field.
 *
 * Unknown models are treated as not taking it: the Gemini 3 line accepts the
 * field but documents that overriding the default degrades reasoning output,
 * so omitting it and letting the provider default apply is the side that
 * keeps answers good.
 */
export function supportsGeminiTemperature(model: string): boolean {
  const normalized = model.trim().toLowerCase()

  return TEMPERATURE_CAPABLE_GEMINI_MODEL_PREFIXES.some((prefix) =>
    normalized.startsWith(prefix),
  )
}
