import type { ImapAccountPublic } from '@/types/settings'

export type ImapAccountFormEntry = {
  passwordNew?: string
} & ImapAccountPublic
