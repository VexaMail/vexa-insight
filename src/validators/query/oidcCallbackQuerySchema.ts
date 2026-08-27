import { z } from 'zod'

/**
 * OIDC callback query params. Strict: without a non-empty `code` and `state`
 * the authorization-code exchange cannot run, which is the pre-existing 400.
 */
export const oidcCallbackQuerySchema = z.object({
  code: z.string({ error: 'Missing code or state' }).min(1),
  state: z.string({ error: 'Missing code or state' }).min(1),
})
