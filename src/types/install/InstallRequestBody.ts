import type { ImapAccountInstall } from './ImapAccountInstall'

/** JSON body the installer form posts to /api/install. */
export type InstallRequestBody = {
  readonly installToken: string
  readonly adminEmail: string
  readonly adminPassword: string
  readonly imapAccounts: ImapAccountInstall[]
  readonly ingestionIntervalMinutes: number
  readonly ingestionDaysBack: number
}
