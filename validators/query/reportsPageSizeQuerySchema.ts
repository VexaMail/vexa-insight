import { DEFAULT_PAGE_SIZE } from '@/constants/reports'
import { z } from 'zod'

/**
 * `pageSize` for the reports list. Missing or non-numeric values fall back to
 * the default page size; valid values are floored and clamped to 1..100.
 */
export const reportsPageSizeQuerySchema = z.coerce
  .number()
  .catch(DEFAULT_PAGE_SIZE)
  .transform((value) => Math.min(100, Math.max(1, Math.floor(value))))
