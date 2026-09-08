import type { SettingsFormState } from './SettingsFormState'

export type SettingsIngestionSectionsProps = {
  readonly apiKey: string
  readonly form: SettingsFormState
  readonly setForm: React.Dispatch<React.SetStateAction<SettingsFormState>>
}
