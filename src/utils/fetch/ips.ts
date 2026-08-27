import type { RefreshIpResult } from './RefreshIpResult'

export async function refreshIpHostname(ip: string): Promise<RefreshIpResult> {
  const res = await fetch(`/api/v1/ips/${ip}/hostname/refresh`, {
    method: 'POST',
  })
  if (!res.ok) {
    throw new Error('Refresh failed')
  }
  const json = (await res.json()) as RefreshIpResult
  return json
}
