import { z } from 'zod'

/**
 * Optional `days` filter. Resolves to a positive integer, or `undefined` when
 * the param is missing or invalid, in which case no time filter is applied.
 */
export const daysFilterQuerySchema = z.coerce
  .number()
  .int()
  .positive()
  .optional()
  .catch(undefined)
