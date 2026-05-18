import type { InstallMethod, SupervisorKind } from '@/types/updates'
import { isGitCheckout } from './isGitCheckout'

/**
 * Combine supervisor + git-checkout detection into a single classification
 * that drives which auto-update path is offered in the UI.
 */
export function detectInstallMethod(supervisor: SupervisorKind): InstallMethod {
  if (supervisor === 'docker') return 'docker'
  const git = isGitCheckout()
  if (!git) return 'unknown'
  if (supervisor === 'systemd' || supervisor === 'pm2') {
    return 'source-supervised'
  }
  return 'source-bare'
}
