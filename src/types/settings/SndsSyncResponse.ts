import type { SndsConnectionPublic, SndsSyncResult } from '@/types/snds'

/** What the SNDS callback and sync endpoints return. */
export type SndsSyncResponse = {
  readonly connection: SndsConnectionPublic
  readonly sync: SndsSyncResult
}
