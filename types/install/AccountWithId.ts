import type { ImapAccountInstall } from '@/types/install'

export type AccountWithId = {
  _id: string
} & ImapAccountInstall
