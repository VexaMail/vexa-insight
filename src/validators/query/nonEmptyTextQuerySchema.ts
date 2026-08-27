import { z } from 'zod'

/**
 * Shared optional free-text query param (`org`, `domain`, `apiKey`). Missing or
 * empty values become `undefined` so they are treated as "not supplied".
 */
export const nonEmptyTextQuerySchema = z
  .string()
  .nullish()
  .transform((value) => value || undefined)
