import { DEFAULT_PAGE } from '@/constants/reports'
import { z } from 'zod'

/**
 * Shared `page` query param. Missing or non-numeric values fall back to the
 * default page; fractional values are floored and anything below 1 is clamped.
 */
export const pageQuerySchema = z.coerce
  .number()
  .catch(DEFAULT_PAGE)
  .transform((value) => Math.max(1, Math.floor(value)))
