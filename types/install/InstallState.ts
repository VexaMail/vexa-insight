import type { AccountWithId } from '@/types/install'

export type InstallState = {
  adminEmail: string
  adminPassword: string
  secretKey: string
  imapAccounts: AccountWithId[]
  ingestionIntervalMinutes: number
  ingestionDaysBack: number
  status: 'idle' | 'loading' | 'error'
  message: string
}
