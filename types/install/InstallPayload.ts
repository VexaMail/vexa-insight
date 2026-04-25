import type { ImapAccountInstall } from '@/types/install'

/**
 * Body for POST /api/install. imapAccounts must have at least one account.
 */
export type InstallPayload = {
  adminEmail: string
  adminPassword: string
  secretKey?: string
  imapAccounts?: ImapAccountInstall[]
  ingestionIntervalMinutes?: number
  ingestionDaysBack?: number
}
