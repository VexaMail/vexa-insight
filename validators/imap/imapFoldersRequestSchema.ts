import { z } from 'zod'

export const imapFoldersRequestSchema = z.object({
  accountId: z.number().positive(),
})
