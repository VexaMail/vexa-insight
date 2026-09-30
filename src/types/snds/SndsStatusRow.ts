/** One parsed SNDS IP status row. */
export type SndsStatusRow = {
  readonly firstIp: string | null
  readonly lastIp: string | null
  readonly blocked: string | null
  readonly details: string | null
  readonly raw: string
}
