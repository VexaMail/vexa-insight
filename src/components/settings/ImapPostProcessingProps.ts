import type { ImapAccountFormEntry } from '../../types/settings/ImapAccountFormEntry'

export type ImapPostProcessingProps = {
  account: ImapAccountFormEntry
  apiKey: string
  index: number
  onUpdate: (index: number, updates: Partial<ImapAccountFormEntry>) => void
}
