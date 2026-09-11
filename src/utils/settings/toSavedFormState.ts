import type { SettingsFormState, SettingsPublic } from '@/types/settings'

/** Form state after a successful save: typed passwords and secret cleared. */
export function toSavedFormState(data: SettingsPublic): SettingsFormState {
  return {
    ...data,
    imapAccounts: data.imapAccounts.map((a) => ({ ...a, passwordNew: '' })),
  }
}
