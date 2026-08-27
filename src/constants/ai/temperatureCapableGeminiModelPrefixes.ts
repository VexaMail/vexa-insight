/**
 * Gemini model IDs whose documentation still presents `temperature` as a
 * usable tuning control (Gemini 2.5 Flash documents default 1, range 0-2).
 *
 * For the Gemini 3 line Google's developer guide says the opposite:
 * "For all Gemini 3 models, we strongly recommend keeping the temperature
 * parameter at its default value of 1.0" — setting it below 1.0 "may lead to
 * unexpected behavior, such as looping or degraded performance". The API
 * accepts the field (no HTTP 400), so this gate is about output quality, not
 * call success. An allow-list of the older families means an unknown (read:
 * newer) model gets the provider default instead of a degrading override.
 *
 * Entries are matched as prefixes, so dated or suffixed ids resolve too.
 */
export const TEMPERATURE_CAPABLE_GEMINI_MODEL_PREFIXES = [
  'gemini-1',
  'gemini-2',
] as const
