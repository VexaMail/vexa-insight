/**
 * What a status colour means across the console: `success` a verified pass,
 * `warning` needs review, `danger` a confirmed failure, `info` neutral news,
 * `unknown` not enough data to say, `neutral` no judgement at all.
 */
export type StatusTone =
  'success' | 'warning' | 'danger' | 'info' | 'unknown' | 'neutral'
