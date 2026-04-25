import type { DnsDiagnostics } from '@/types/diagnostics'

export async function fetchDnsData(
  domainId: number,
  signal: AbortSignal,
): Promise<DnsDiagnostics> {
  const res = await fetch(`/api/v1/domains/${domainId}/dns`, { signal })

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`)
  }

  const json = (await res.json()) as {
    data?: DnsDiagnostics
    error?: { message?: string }
  }

  if (!json.data) {
    throw new Error(json.error?.message ?? 'DNS diagnostics payload is invalid')
  }

  return json.data
}
