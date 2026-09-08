import type { AiSettingsSaveStatus } from '@/types/settings'

export type AiSettingsActionsProps = {
  readonly saveStatus: AiSettingsSaveStatus
  readonly isSaving: boolean
  readonly isConfigured: boolean
  readonly canSave: boolean
  readonly onSave: () => void
  readonly onClear: () => void
}
