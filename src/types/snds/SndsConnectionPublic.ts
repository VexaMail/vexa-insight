/** What Settings may show about the SNDS connection; never a secret. */
export type SndsConnectionPublic = {
  readonly connected: boolean
  readonly pending: boolean
  readonly connectedAt: string | null
  readonly lastSyncAt: string | null
  readonly lastSyncStatus: string | null
  readonly lastSyncError: string | null
}
