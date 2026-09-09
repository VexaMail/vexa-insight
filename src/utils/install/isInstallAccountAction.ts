import type { InstallAccountAction, InstallAction } from '@/types/install'

export function isInstallAccountAction(
  action: InstallAction,
): action is InstallAccountAction {
  return (
    action.type === 'ADD_ACCOUNT' ||
    action.type === 'UPDATE_ACCOUNT' ||
    action.type === 'REMOVE_ACCOUNT'
  )
}
