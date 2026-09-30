import { saveSndsConnection } from './saveSndsConnection'

/**
 * Forgets the SNDS tokens. Stored report rows stay: they are history, and a
 * reconnect only adds to them.
 */
export function disconnectSnds(): void {
  saveSndsConnection({
    refreshTokenEncrypted: null,
    pendingVerifierEncrypted: null,
    pendingCreatedAt: null,
    connectedAt: null,
    lastSyncStatus: null,
    lastSyncError: null,
  })
}
