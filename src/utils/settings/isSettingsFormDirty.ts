import type { SettingsFormState } from '@/types/settings'

/** True when the form holds values that differ from the last saved ones. */
export function isSettingsFormDirty(
  form: SettingsFormState,
  saved: SettingsFormState,
): boolean {
  return JSON.stringify(form) !== JSON.stringify(saved)
}
