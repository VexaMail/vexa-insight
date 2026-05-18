import type { SelfUpdateCapability } from '@/types/updates'
import {
  detectInstallMethod,
  detectSupervisor,
  isGitCheckout,
} from './internals'

/**
 * Decide whether the in-app "Apply update now" button is offered. The
 * answer is exposed to the UI so the button can be hidden, with reasons
 * explaining why for installers that aren't supported.
 */
export function getSelfUpdateCapability(): SelfUpdateCapability {
  const supervisor = detectSupervisor()
  const installMethod = detectInstallMethod(supervisor)
  const gitCheckout = isGitCheckout()

  const reasons: string[] = []
  if (!gitCheckout) reasons.push('No .git directory in the working tree.')
  if (installMethod === 'docker') {
    reasons.push(
      'Running inside a container — use Watchtower for hands-off auto-updates.',
    )
  }
  if (installMethod === 'source-bare') {
    reasons.push(
      'No process supervisor detected (systemd, PM2). Run the source-upgrade command manually, or set VEXA_HAS_SUPERVISOR=true if a supervisor is in fact present.',
    )
  }
  if (installMethod === 'unknown') {
    reasons.push(
      'Cannot determine how this instance was installed. Apply updates manually.',
    )
  }

  return {
    canApply: installMethod === 'source-supervised',
    installMethod,
    supervisor,
    gitCheckout,
    reasons,
  }
}
