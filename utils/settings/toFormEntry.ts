import type { SettingsPublic } from '@/types/settings'
import type { ImapAccountFormEntry } from '../../types/settings/ImapAccountFormEntry'

export function toFormEntry(
  acc: SettingsPublic['imapAccounts'][number],
): ImapAccountFormEntry {
  return { ...acc, passwordNew: '' }
}
