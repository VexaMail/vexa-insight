import type { ImapAccountInstall } from './ImapAccountInstall'

export type AccountWithId = {
  _id: string
} & ImapAccountInstall
