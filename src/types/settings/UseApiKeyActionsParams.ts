import type { Dispatch, SetStateAction } from 'react'
import type { SettingsFormState } from './SettingsFormState'
import type { SettingsSaveStatus } from './SettingsSaveStatus'

export type UseApiKeyActionsParams = {
  readonly apiKey: string
  readonly setForm: Dispatch<SetStateAction<SettingsFormState>>
  readonly setMessage: (message: string) => void
  readonly setSaveStatus: (status: SettingsSaveStatus) => void
}
