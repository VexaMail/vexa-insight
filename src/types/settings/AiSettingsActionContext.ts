import type { Dispatch, SetStateAction } from 'react'
import type { AiSettingsFormState } from './AiSettingsFormState'
import type { AiSettingsStatusState } from './AiSettingsStatusState'
import type { AiSettingsStoredState } from './AiSettingsStoredState'

/** Everything the save and clear actions of the AI settings form touch. */
export type AiSettingsActionContext = {
  readonly apiKey: string
  readonly form: AiSettingsFormState
  readonly setForm: Dispatch<SetStateAction<AiSettingsFormState>>
  readonly stored: AiSettingsStoredState
  readonly status: AiSettingsStatusState
}
