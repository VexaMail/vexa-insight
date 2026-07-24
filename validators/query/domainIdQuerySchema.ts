import { z } from 'zod'

/**
 * Shared `domainId` query param. Returns `null` when the param is missing or
 * non-numeric so callers keep their existing "no domain filter" branch.
 */
export const domainIdQuerySchema = z.coerce.number().nullable().catch(null)
