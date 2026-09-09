import type { InstallFieldAction, InstallState } from '@/types/install'

export function reduceInstallFields(
  state: InstallState,
  action: InstallFieldAction,
): InstallState {
  switch (action.type) {
    case 'SET_ADMIN_EMAIL':
      return { ...state, adminEmail: action.payload }
    case 'SET_ADMIN_PASSWORD':
      return { ...state, adminPassword: action.payload }
    case 'SET_INSTALL_TOKEN':
      return { ...state, installToken: action.payload }
    case 'SET_SECRET_KEY':
      return { ...state, secretKey: action.payload }
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
