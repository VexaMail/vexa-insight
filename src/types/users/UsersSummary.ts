/** Counts behind the KPI tiles of the users page. */
export type UsersSummary = {
  readonly total: number
  readonly admins: number
  readonly viewers: number
  /** Accounts limited to a list of domains. */
  readonly restricted: number
}
