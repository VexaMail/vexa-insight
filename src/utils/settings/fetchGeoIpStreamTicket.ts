/**
 * Mints a single-use ticket for the GeoIP update SSE stream over an
 * authenticated POST, so the admin key never has to travel in the EventSource
 * URL (which proxies and browser history record).
 */
export async function fetchGeoIpStreamTicket(apiKey: string): Promise<string> {
  const res = await fetch('/api/v1/admin/geoip/update-db-ticket', {
    method: 'POST',
    headers: { 'X-API-Key': apiKey },
  })

  const json = (await res.json()) as
    { data: { ticket: string } } | { error: { message: string } }

  if (!res.ok || 'error' in json) {
    const msg =
      'error' in json
        ? json.error.message
        : 'Failed to authorize the update stream'
    throw new Error(msg)
  }

  return json.data.ticket
}
