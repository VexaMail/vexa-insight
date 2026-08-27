import { z } from 'zod'
import { imapTestAccountSchema } from './imapTestAccountSchema'

/**
 * Body of the IMAP connection test endpoint. A stored account is referenced by
 * id; inline credentials are accepted either nested under `account` or at the
 * top level. The members are ordered by precedence: an usable `accountId`
 * always wins, then a nested account, then top-level credentials.
 */
export const imapTestRequestSchema = z.union([
  z.object({ accountId: z.number().positive() }),
  z.object({ account: imapTestAccountSchema }),
  imapTestAccountSchema.transform((account) => ({ account })),
])
