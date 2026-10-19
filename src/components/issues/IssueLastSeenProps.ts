export type IssueLastSeenProps = {
  /** Unix seconds of the newest evidence; null when there is none. */
  readonly seconds: number | null
  readonly nowMs: number
}
