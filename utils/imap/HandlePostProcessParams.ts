import type { EmailProgressPayload } from '@/types/dashboard'
import type { ImapFlow } from 'imapflow'

export type HandlePostProcessParams = {
  accountId: number
  client: ImapFlow
  context: string
  emailDate?: string | undefined
  markAsReadAfterProcess: boolean
  moveToTrashAfterProcess: boolean
  onProgress?:
    ((payload: EmailProgressPayload) => Promise<void> | void) | undefined
  postProcessAction: string
  postProcessFolder: string | null
  sourceFolder: string
  subject?: string | undefined
  trashPath: string | null
  uidStr: string
}
