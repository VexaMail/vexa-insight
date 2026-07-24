import type { z } from 'zod'
import type { imapCreateFolderRequestSchema } from './imapCreateFolderRequestSchema'

export type ImapCreateFolderRequestInput = z.infer<
  typeof imapCreateFolderRequestSchema
>
