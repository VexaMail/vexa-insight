import type { SettingsFormState } from './SettingsFormState'

export type SettingsAccessSectionsProps = {
  readonly apiKey: string
  readonly form: SettingsFormState
  readonly setForm: React.Dispatch<React.SetStateAction<SettingsFormState>>
  readonly onCopyApiKey: () => void
}
