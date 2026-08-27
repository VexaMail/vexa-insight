import type { ImapAccountConfig } from '@/types/config'
import { z } from 'zod'
import { imapTestPortSchema } from './imapTestPortSchema'

/**
 * Inline IMAP credentials accepted by the connection test endpoint.
 * Only the connection fields are read from the request; the remaining
 * account options are fixed defaults because nothing is persisted here.
 */
export const imapTestAccountSchema = z
  .object({
    server: z.string().min(1),
    port: imapTestPortSchema,
    username: z.string().min(1),
    password: z.string().min(1),
  })
  .transform(({ server, port, username, password }): ImapAccountConfig => ({
    id: 0,
    server,
    port,
    username,
    password,
    fetchIncludeTrash: false,
    fetchIncludeAllFolders: false,
    postProcessAction: 'none',
    postProcessFolder: null,
    moveToTrashAfterProcess: false,
    markAsReadAfterProcess: false,
  }))
