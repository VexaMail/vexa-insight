import { z } from 'zod'

/**
 * `days` window for the trend endpoint. Missing, non-numeric and zero values
 * fall back to 30; valid values are truncated and clamped to 1..3650.
 */
export const trendDaysQuerySchema = z.coerce
  .number()
  .catch(30)
  .transform((value) => Math.min(3650, Math.max(1, Math.trunc(value) || 30)))
