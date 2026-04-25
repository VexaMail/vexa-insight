import type { SettingsFormState, SettingsPublic } from '@/types/settings'
import { DEFAULT_FORM } from './defaultForm'
import { toFormEntry } from './toFormEntry'

/**
 * Builds form state from initialData. Uses defaults when initialData is null.
 */
function getSettingsFormState(
  initialData: SettingsPublic | null,
): SettingsFormState {
  if (!initialData) return { ...DEFAULT_FORM }
  return {
    ...initialData,
    imapAccounts: initialData.imapAccounts.map(toFormEntry),
    secretKeyNew: '',
  }
}

export { getSettingsFormState }
