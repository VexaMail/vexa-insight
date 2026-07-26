import { TEMPERATURE_CAPABLE_CLAUDE_MODEL_PREFIXES } from '@/constants/ai'

/**
 * Whether an Anthropic model still accepts the `temperature` request field.
 *
 * Unknown models are treated as not accepting it: dropping the field costs a
 * little determinism, while sending it to a model that removed it fails the
 * whole call with HTTP 400.
 */
export function supportsAnthropicTemperature(model: string): boolean {
  const normalized = model.trim().toLowerCase()

  return TEMPERATURE_CAPABLE_CLAUDE_MODEL_PREFIXES.some((prefix) =>
    normalized.startsWith(prefix),
  )
}
