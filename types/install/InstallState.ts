import type { AccountWithId } from './AccountWithId'

export type InstallState = {
  adminEmail: string
  adminPassword: string
  installToken: string
  secretKey: string
  imapAccounts: AccountWithId[]
  ingestionIntervalMinutes: number
  ingestionDaysBack: number
  status: 'idle' | 'loading' | 'error'
  message: string
}
