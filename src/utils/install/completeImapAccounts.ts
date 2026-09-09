import type { AccountWithId } from '@/types/install'

/** The accounts that have a server, a username and a password. */
export function completeImapAccounts(
  accounts: AccountWithId[],
): AccountWithId[] {
  return accounts.filter(
    (a) => a.server.trim() && a.username.trim() && a.password,
  )
}
