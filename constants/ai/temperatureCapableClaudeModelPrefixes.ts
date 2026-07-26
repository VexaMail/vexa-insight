/**
 * Claude model IDs that still accept a `temperature` on `/v1/messages`.
 *
 * Anthropic removed the sampling parameters starting with Opus 4.7: the Claude
 * 5 models and Opus 4.7/4.8 answer `` `temperature` is deprecated for this
 * model `` with HTTP 400, while the 4.6 generation and everything older accept
 * it. The list is therefore an allow-list of the older families rather than a
 * deny-list of the newer ones, so an unknown (read: newer) model loses the
 * temperature instead of failing the call outright.
 *
 * Entries are matched as prefixes, because a configured model may carry a date
 * suffix (`claude-sonnet-4-5-20250929`).
 */
export const TEMPERATURE_CAPABLE_CLAUDE_MODEL_PREFIXES = [
  'claude-2',
  'claude-3',
  'claude-haiku-4-5',
  'claude-opus-4-0',
  'claude-opus-4-1',
  'claude-opus-4-5',
  'claude-opus-4-6',
  'claude-sonnet-4-0',
  'claude-sonnet-4-5',
  'claude-sonnet-4-6',
] as const
