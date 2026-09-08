import type { ImapAccountFormEntry } from '../../types/settings/ImapAccountFormEntry'

export type ImapFetchOptionsProps = {
  account: ImapAccountFormEntry
  index: number
  onUpdate: (index: number, updates: Partial<ImapAccountFormEntry>) => void
}
