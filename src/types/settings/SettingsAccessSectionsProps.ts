import type { ImapAccountFormEntry } from './ImapAccountFormEntry'
import type { SettingsFormState } from './SettingsFormState'

export type SettingsAccessSectionsProps = {
  readonly apiKey: string
  readonly form: SettingsFormState
  readonly onImapUpdate: (
    index: number,
    updates: Partial<ImapAccountFormEntry>,
  ) => void
  readonly onImapAdd: () => void
  readonly onImapRemove: (index: number) => void
  readonly onTestConnection: (accountId: number) => void
  readonly onCopyApiKey: () => void
}
