import type { ImapAccountFormEntry } from '../../types/settings/ImapAccountFormEntry'

export type ImapMoveToFolderControlProps = {
  account: ImapAccountFormEntry
  apiKey: string
  index: number
  moveToFolder: boolean
  onUpdate: (index: number, updates: Partial<ImapAccountFormEntry>) => void
}
