import type { InstallAction, InstallState } from '@/types/install'

import { defaultAccount } from './defaultAccount'

export function installReducer(
  state: InstallState,
  action: InstallAction,
): InstallState {
  switch (action.type) {
    case 'SET_ADMIN_EMAIL':
      return { ...state, adminEmail: action.payload }
    case 'SET_ADMIN_PASSWORD':
      return { ...state, adminPassword: action.payload }
    case 'SET_SECRET_KEY':
      return { ...state, secretKey: action.payload }
    case 'ADD_ACCOUNT': {
      return {
        ...state,
        imapAccounts: [...state.imapAccounts, defaultAccount()],
      }
    }
    case 'UPDATE_ACCOUNT':
      return {
        ...state,
        imapAccounts: state.imapAccounts.map((acc, i) =>
          i === action.index ? { ...acc, [action.field]: action.value } : acc,
        ),
      }
    case 'REMOVE_ACCOUNT': {
      const next = state.imapAccounts.filter((_, i) => i !== action.index)
      return {
        ...state,
        imapAccounts: next.length > 0 ? next : [defaultAccount()],
      }
    }
    case 'SET_INTERVAL':
      return { ...state, ingestionIntervalMinutes: action.payload }
    case 'SET_DAYS_BACK':
      return { ...state, ingestionDaysBack: action.payload }
    case 'SET_SUBMIT_STATUS':
      return { ...state, status: action.status, message: action.message }
    default:
      return state
  }
}
