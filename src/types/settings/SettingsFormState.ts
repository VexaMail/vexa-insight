import type { ImapAccountFormEntry } from './ImapAccountFormEntry'
import type { SettingsPublic } from './SettingsPublic'

/**
 * Form state for SettingsConfigForm (public fields plus optional new secret fields).
 */
export type SettingsFormState = {
  imapAccounts: ImapAccountFormEntry[]
} & Omit<SettingsPublic, 'imapAccounts'>
