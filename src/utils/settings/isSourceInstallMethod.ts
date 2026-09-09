import type { InstallMethod } from '@/types/updates'

/** Whether the in-app updater can drive this install (a git checkout). */
export function isSourceInstallMethod(installMethod: InstallMethod): boolean {
  return (
    installMethod === 'source-supervised' || installMethod === 'source-bare'
  )
}
