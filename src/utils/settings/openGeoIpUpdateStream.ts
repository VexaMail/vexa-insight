import type { GeoIpStreamHandlers } from '@/types/settings'
import { attachGeoIpStreamHandlers } from './attachGeoIpStreamHandlers'
import { fetchGeoIpStreamTicket } from './fetchGeoIpStreamTicket'

/**
 * Opens the database-update event stream. EventSource cannot set headers, so
 * the stream is authorized by a single-use ticket minted over an authenticated
 * POST; the admin key itself never reaches the URL.
 */
export async function openGeoIpUpdateStream(
  apiKey: string,
  handlers: GeoIpStreamHandlers,
): Promise<void> {
  try {
    const ticket = await fetchGeoIpStreamTicket(apiKey)
    attachGeoIpStreamHandlers(
      new EventSource(
        `/api/v1/admin/geoip/update-db-stream?ticket=${encodeURIComponent(ticket)}`,
      ),
      handlers,
    )
  } catch (err: unknown) {
    handlers.onError(
      err instanceof Error ? err.message : 'Update request failed.',
    )
  }
}
