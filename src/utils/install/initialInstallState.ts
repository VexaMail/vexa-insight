import type { InstallState } from '@/types/install'
import { defaultAccount } from './defaultAccount'
import { DEFAULT_DAYS_BACK } from './defaultDaysBack'
import { DEFAULT_INTERVAL } from './defaultInterval'

/** A fresh installer form: one blank IMAP account and the default schedule. */
export function initialInstallState(): InstallState {
  return {
    adminEmail: '',
    adminPassword: '',
    installToken: '',
    imapAccounts: [defaultAccount()],
    ingestionIntervalMinutes: DEFAULT_INTERVAL,
    ingestionDaysBack: DEFAULT_DAYS_BACK,
    status: 'idle',
    message: '',
  }
}
