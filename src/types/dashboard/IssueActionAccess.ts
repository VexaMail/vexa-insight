/** Whether the viewer may record issue actions, and on which domains. */
export type IssueActionAccess = {
  canWrite: boolean
  /** Null when the viewer may see every domain. */
  allowedDomains: ReadonlySet<string> | null
}
