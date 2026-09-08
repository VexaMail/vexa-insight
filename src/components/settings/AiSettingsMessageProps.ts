import type { AiSettingsSaveStatus } from '@/types/settings'

export type AiSettingsMessageProps = {
  readonly message: string
  readonly saveStatus: AiSettingsSaveStatus
}
