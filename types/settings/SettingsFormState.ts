import type { SettingsPublic } from '@/types/settings'
import type { ImapAccountFormEntry } from './ImapAccountFormEntry'

/**
 * Form state for SettingsConfigForm (public fields plus optional new secret fields).
 */
export type SettingsFormState = {
  imapAccounts: ImapAccountFormEntry[]
  secretKeyNew: string
} & Omit<SettingsPublic, 'imapAccounts'>
