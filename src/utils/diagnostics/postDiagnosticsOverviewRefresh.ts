import type {
  DiagnosticsOverviewRefreshResponse,
  DiagnosticsOverviewRow,
} from '@/types/diagnostics'

/** Asks the server to check one batch of domains now; throws when it fails. */
export async function postDiagnosticsOverviewRefresh(
  domainIds: readonly number[],
  signal: AbortSignal,
): Promise<DiagnosticsOverviewRow[]> {
  const response = await fetch('/api/v1/diagnostics/overview/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domainIds }),
    signal,
  })
  const body = (await response.json()) as DiagnosticsOverviewRefreshResponse
  if (!response.ok || !body.data) {
    throw new Error(body.error?.message ?? `Error ${String(response.status)}`)
  }
  return body.data.rows
}
