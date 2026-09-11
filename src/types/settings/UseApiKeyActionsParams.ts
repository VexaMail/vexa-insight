import type { SettingsSaveStatus } from './SettingsSaveStatus'

export type UseApiKeyActionsParams = {
  readonly apiKey: string
  readonly setMessage: (message: string) => void
  readonly setSaveStatus: (status: SettingsSaveStatus) => void
}
