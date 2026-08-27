import { z } from 'zod'

export const imapCreateFolderRequestSchema = z.object({
  accountId: z.number().positive(),
  folderPath: z.string().trim().min(1),
})
