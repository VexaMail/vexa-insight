/**
 * OpenAI model IDs that take the pre-reasoning `/v1/chat/completions`
 * parameter set: `max_tokens` for the output cap, and a `temperature` other
 * than the default.
 *
 * The reasoning families (`o1`/`o3`/`o4`, `gpt-5`) reject both. `temperature`
 * answers `Unsupported value: 'temperature' does not support 0.2 with this
 * model. Only the default (1) value is supported.`, and `max_tokens` has to be
 * `max_completion_tokens` instead — either one fails the call with HTTP 400,
 * so both have to move together for those models to work at all.
 *
 * This is an allow-list of the older families rather than a deny-list of the
 * reasoning ones: OpenAI's newer releases are reasoning models, so treating an
 * unrecognised id as the modern shape is the side that keeps working.
 *
 * `gpt-5-chat` is deliberately absent — reports disagree on whether the
 * non-reasoning chat variant accepts `temperature`, and the modern shape is
 * the harmless side of that uncertainty.
 *
 * Entries are matched as prefixes, so dated snapshots resolve too.
 */
export const LEGACY_OPENAI_CHAT_MODEL_PREFIXES = [
  'chatgpt-4o',
  'gpt-3.5',
  'gpt-4',
] as const
