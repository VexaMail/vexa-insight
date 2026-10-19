import type { SettingsSaveStatus } from './SettingsSaveStatus'

/** What the settings save bar reports: the last save and whether edits are pending. */
export type SettingsSaveBarStatusProps = {
  readonly saveStatus: SettingsSaveStatus
  readonly message: string
  readonly isDirty: boolean
}
