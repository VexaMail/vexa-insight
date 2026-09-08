import type { ImapAccountFormEntry } from '../../types/settings/ImapAccountFormEntry'

export type ImapAccountRowProps = {
  account: ImapAccountFormEntry
  apiKey: string
  index: number
  isExpanded: boolean
  onRemove: (index: number) => void
  onTestConnection: (accountId: number) => void
  onToggleExpand: (index: number) => void
  onUpdate: (index: number, updates: Partial<ImapAccountFormEntry>) => void
  removable: boolean
}
