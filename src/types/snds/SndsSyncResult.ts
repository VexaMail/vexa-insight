/** Outcome of one SNDS sync. */
export type SndsSyncResult = {
  readonly status: 'ok' | 'no-data' | 'error' | 'not-connected'
  readonly daysFetched: number
  readonly rowsStored: number
  readonly statusRows: number
  /** Days SNDS answered with an error; they are retried on the next sync. */
  readonly failedDates: readonly string[]
  readonly error: string | null
}
