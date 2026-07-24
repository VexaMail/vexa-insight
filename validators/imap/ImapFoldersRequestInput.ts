import type { z } from 'zod'
import type { imapFoldersRequestSchema } from './imapFoldersRequestSchema'

export type ImapFoldersRequestInput = z.infer<typeof imapFoldersRequestSchema>
