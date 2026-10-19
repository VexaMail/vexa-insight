import type { DiagnosticsOverviewRow } from './DiagnosticsOverviewRow'

/** Body of `POST /api/v1/diagnostics/overview/refresh`. */
export type DiagnosticsOverviewRefreshResponse = {
  readonly data?: { readonly rows: DiagnosticsOverviewRow[] }
  readonly error?: { readonly code: string; readonly message: string }
}
