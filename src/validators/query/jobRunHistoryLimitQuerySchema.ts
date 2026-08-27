import { z } from 'zod'

/**
 * `limit` for the job-run history. Missing, non-numeric and zero values fall
 * back to 50; valid values are truncated and clamped to 1..100.
 */
export const jobRunHistoryLimitQuerySchema = z.coerce
  .number()
  .catch(50)
  .transform((value) => Math.min(100, Math.max(1, Math.trunc(value) || 50)))
