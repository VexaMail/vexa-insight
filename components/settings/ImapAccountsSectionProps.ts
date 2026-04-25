import type { ImapAccountFormEntry } from '../../types/settings/ImapAccountFormEntry'

export type ImapAccountsSectionProps = {
  accounts: ImapAccountFormEntry[]
  apiKey: string
  onUpdate: (index: number, updates: Partial<ImapAccountFormEntry>) => void
  onAdd: () => void
  onRemove: (index: number) => void
  onTestConnection: (accountId: number) => void
}
