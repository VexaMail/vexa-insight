import { installTokenStore } from './installTokenStorePrivate'

/**
 * Clears the install token from process memory. Called after a successful
 * install so the token cannot be reused.
 */
export function clearInstallToken(): void {
  installTokenStore.value = null
}
