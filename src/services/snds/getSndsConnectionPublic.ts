import type { SndsConnectionPublic } from '@/types/snds'
import { getSndsConnectionRow } from './getSndsConnectionRow'

/** The SNDS connection state for Settings, with no secret in it. */
export function getSndsConnectionPublic(): SndsConnectionPublic {
  const row = getSndsConnectionRow()
  if (!row) {
    return {
      connected: false,
      pending: false,
      connectedAt: null,
      lastSyncAt: null,
      lastSyncStatus: null,
      lastSyncError: null,
    }
  }
  return {
    connected: row.refreshTokenEncrypted !== null,
    pending: row.pendingVerifierEncrypted !== null,
    connectedAt: row.connectedAt?.toISOString() ?? null,
    lastSyncAt: row.lastSyncAt?.toISOString() ?? null,
    lastSyncStatus: row.lastSyncStatus,
    lastSyncError: row.lastSyncError,
  }
}
