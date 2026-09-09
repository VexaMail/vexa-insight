import type { InstallAction } from '@/types/install'

export function installErrorAction(message: string): InstallAction {
  return { type: 'SET_SUBMIT_STATUS', status: 'error', message }
}
