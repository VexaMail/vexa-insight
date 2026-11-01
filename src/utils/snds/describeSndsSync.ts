import type { SndsSyncResult } from '@/types/snds'

/** One line for Settings about how a sync went. */
export function describeSndsSync(sync: SndsSyncResult): string {
  if (sync.status === 'error')
    return `Sync failed: ${sync.error ?? 'unknown error'}`
  if (sync.status === 'not-connected') return 'SNDS is not connected.'
  if (sync.status === 'no-data' && !sync.error)
    return 'Synced. SNDS has no data for your IPs yet.'
  const synced = `Synced ${String(sync.rowsStored)} rows over ${String(sync.daysFetched)} days, ${String(sync.statusRows)} status entries.`
  return sync.error ? `${synced} ${sync.error}` : synced
}
