import type { AiSettingsSaveStatus } from './AiSettingsSaveStatus'

/** Save status and message of the AI settings form, with the success reporter. */
export type AiSettingsStatusState = {
  readonly saveStatus: AiSettingsSaveStatus
  readonly setSaveStatus: (status: AiSettingsSaveStatus) => void
  readonly message: string
  readonly setMessage: (message: string) => void
  readonly reportSuccess: (text: string) => void
}
