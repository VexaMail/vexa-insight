import { installTokenStore } from './installTokenStorePrivate'

/**
 * Returns the current install token if one is set in process memory, or null.
 * Does not generate a token; see `getOrCreateInstallToken` for that.
 */
export function getInstallToken(): string | null {
  return installTokenStore.value
}
