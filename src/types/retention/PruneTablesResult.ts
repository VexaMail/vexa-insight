/** Rows removed by one retention prune, per table. */
export type PruneTablesResult = {
  readonly sessions: number
  readonly pollEvents: number
}
