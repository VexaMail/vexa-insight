import { z } from 'zod'

export const imapAccountSchema = z.object({
  id: z.number().int().positive().optional(),
  label: z.string(),
  server: z.string(),
  port: z.number().int().min(1).max(65535),
  username: z.string(),
  password: z.string().optional(),
  fetchIncludeTrash: z.boolean().optional(),
  fetchIncludeAllFolders: z.boolean().optional(),
  postProcessAction: z.string().optional(),
  postProcessFolder: z.string().nullable().optional(),
  moveToTrashAfterProcess: z.boolean().optional(),
  markAsReadAfterProcess: z.boolean().optional(),
})
