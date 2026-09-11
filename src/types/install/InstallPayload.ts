import type { ImapAccountInstall } from './ImapAccountInstall'
/**
 * Body for POST /api/install. imapAccounts must have at least one account.
 */
export type InstallPayload = {
  adminEmail: string
  adminPassword: string
  imapAccounts?: ImapAccountInstall[]
  ingestionIntervalMinutes?: number
  ingestionDaysBack?: number
}
