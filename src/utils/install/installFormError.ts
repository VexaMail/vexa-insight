import { MIN_SECRET_LENGTH } from '@/constants/auth'
import type { AccountWithId, InstallState } from '@/types/install'

/** The reason a full install cannot be submitted yet, or null when it can. */
export function installFormError(
  state: InstallState,
  isPartial: boolean | undefined,
  completeAccounts: AccountWithId[],
): string | null {
  if (isPartial) return null
  if (state.secretKey.length < MIN_SECRET_LENGTH) {
    return `API key must be at least ${String(MIN_SECRET_LENGTH)} characters.`
  }
  if (completeAccounts.length === 0) {
    return 'At least one IMAP account with server, username, and password is required.'
  }
  return null
}
