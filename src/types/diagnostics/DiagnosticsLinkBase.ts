/** What every link inside one domain's diagnostics keeps: domain and filters. */
export type DiagnosticsLinkBase = {
  readonly domain: string
  /** Query string without `tab`, e.g. "days=30". */
  readonly query: string
}
