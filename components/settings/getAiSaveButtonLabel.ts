import type { AiSettingsSaveStatus } from '@/types/settings'

export function getAiSaveButtonLabel(saveStatus: AiSettingsSaveStatus): string {
  if (saveStatus === 'validating') return 'Validating key…'
  if (saveStatus === 'loading') return 'Saving…'
  return 'Save AI Settings'
}
