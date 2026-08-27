import type { UpdateChannel } from '@/types/updates'

export type UpsertUpdateStateInput = {
  readonly enabled?: boolean
  readonly channel?: UpdateChannel
  readonly currentVersion?: string | null
  readonly latestVersion?: string | null
  readonly latestUrl?: string | null
  readonly latestPublishedAt?: Date | null
  readonly latestNotes?: string | null
  readonly lastCheckedAt?: Date | null
  readonly lastErrorAt?: Date | null
  readonly lastError?: string | null
}
