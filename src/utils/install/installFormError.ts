import type { AccountWithId, InstallState } from '@/types/install'

/** The reason a full install cannot be submitted yet, or null when it can. */
export function installFormError(
  state: InstallState,
  isPartial: boolean | undefined,
  completeAccounts: AccountWithId[],
): string | null {
  if (isPartial) return null
  if (completeAccounts.length === 0) {
    return 'At least one IMAP account with server, username, and password is required.'
  }
  return null
}
