import { z } from 'zod'

/**
 * `limit` for the audit log. Missing or non-numeric values fall back to 100;
 * valid values are truncated and clamped to 1..500.
 */
export const auditLogLimitQuerySchema = z.coerce
  .number()
  .catch(100)
  .transform((value) => Math.min(Math.max(Math.trunc(value), 1), 500))
