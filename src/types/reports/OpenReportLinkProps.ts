export type OpenReportLinkProps = {
  readonly reportId: number
  /** Domain the list is scoped to, so the report's back link returns there. */
  readonly domainName: string | undefined
  /** Report ids the detail page's previous/next navigator walks through. */
  readonly scopeIds: string[]
}
