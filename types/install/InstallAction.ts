import type { ImapAccountInstall } from '@/types/install'

export type InstallAction =
  | { type: 'SET_ADMIN_EMAIL'; payload: string }
  | { type: 'SET_ADMIN_PASSWORD'; payload: string }
  | { type: 'SET_SECRET_KEY'; payload: string }
  | { type: 'ADD_ACCOUNT' }
  | {
      type: 'UPDATE_ACCOUNT'
      index: number
      field: keyof ImapAccountInstall
      value: string | number
    }
  | { type: 'REMOVE_ACCOUNT'; index: number }
  | { type: 'SET_INTERVAL'; payload: number }
  | { type: 'SET_DAYS_BACK'; payload: number }
  | {
      type: 'SET_SUBMIT_STATUS'
      status: 'idle' | 'loading' | 'error'
      message: string
    }
