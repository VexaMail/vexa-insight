import type { InstallAccountAction, InstallState } from '@/types/install'

import { defaultAccount } from './defaultAccount'

export function reduceInstallAccounts(
  state: InstallState,
  action: InstallAccountAction,
): InstallState {
  switch (action.type) {
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
    default:
      return state
  }
}
