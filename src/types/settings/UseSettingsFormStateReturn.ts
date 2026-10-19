import type { Dispatch, SetStateAction } from 'react'
import type { SettingsFormState } from './SettingsFormState'

/** The settings form values, whether they differ from the last save, and a way to record a save. */
export type UseSettingsFormStateReturn = {
  readonly form: SettingsFormState
  readonly setForm: Dispatch<SetStateAction<SettingsFormState>>
  readonly isDirty: boolean
  readonly markSaved: (saved: SettingsFormState) => void
}
