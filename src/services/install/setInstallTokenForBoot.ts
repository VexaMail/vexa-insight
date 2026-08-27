import { installTokenStore } from './installTokenStorePrivate'

/**
 * Persists the install token in process memory until install completes
 * (or the process restarts). Re-displayed on every boot until cleared.
 */
export function setInstallTokenForBoot(value: string): void {
  installTokenStore.value = value
}
