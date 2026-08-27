import type { UpdateChannel } from './UpdateChannel'

/**
 * Public-shape update status returned by the API and consumed by the UI.
 * All timestamps are ISO-8601 strings to keep the contract serializable.
 */
export type UpdateStatusPublic = {
  readonly enabled: boolean
  readonly channel: UpdateChannel
  readonly currentVersion: string
  readonly latestVersion: string | null
  readonly latestUrl: string | null
  readonly latestPublishedAt: string | null
  readonly latestNotes: string | null
  readonly updateAvailable: boolean
  readonly lastCheckedAt: string | null
  readonly lastError: string | null
  readonly repoSlug: string
}
