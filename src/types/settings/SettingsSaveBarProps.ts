import type { SettingsSaveBarStatusProps } from './SettingsSaveBarStatusProps'

/** The settings save bar: its status line plus whether Save may run. */
export type SettingsSaveBarProps = SettingsSaveBarStatusProps & {
  readonly canSave: boolean
}
