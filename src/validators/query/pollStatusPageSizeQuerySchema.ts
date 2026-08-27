import { pollStatusPageSize } from '@/utils/validation'
import { z } from 'zod'

/**
 * `pageSize` for the poll-status endpoints. Missing or non-numeric values, and
 * any value outside the allowed set (50, 100, 300, 500, 1000), become 50.
 */
export const pollStatusPageSizeQuerySchema = z.coerce
  .number()
  .catch(50)
  .transform((value) => pollStatusPageSize(value))
