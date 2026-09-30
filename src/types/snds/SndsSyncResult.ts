/** Outcome of one SNDS sync. */
export type SndsSyncResult = {
  readonly status: 'ok' | 'no-data' | 'error' | 'not-connected'
  readonly daysFetched: number
  readonly rowsStored: number
  readonly statusRows: number
  readonly error: string | null
}
