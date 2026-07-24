import type { z } from 'zod'
import type { imapTestRequestSchema } from './imapTestRequestSchema'

export type ImapTestRequestInput = z.infer<typeof imapTestRequestSchema>
