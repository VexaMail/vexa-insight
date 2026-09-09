import type { InstallAction, InstallState } from '@/types/install'

import { isInstallAccountAction } from './isInstallAccountAction'
import { reduceInstallAccounts } from './reduceInstallAccounts'
import { reduceInstallFields } from './reduceInstallFields'

export function installReducer(
  state: InstallState,
  action: InstallAction,
): InstallState {
  if (isInstallAccountAction(action)) {
    return reduceInstallAccounts(state, action)
  }
  return reduceInstallFields(state, action)
}
