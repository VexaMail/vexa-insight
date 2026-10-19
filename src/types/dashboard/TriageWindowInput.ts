/** What the date filter in the URL resolves to before it becomes a window. */
export type TriageWindowInput = {
  days: number
  from?: Date
  to?: Date
  now: Date
}
