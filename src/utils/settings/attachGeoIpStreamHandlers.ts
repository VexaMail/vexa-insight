import type { GeoIpProgressEvent } from '@/types/geoipProgress'
import type { GeoIpStreamHandlers } from '@/types/settings'

/**
 * Wires the GeoIP update SSE events onto UI callbacks and owns the transport
 * lifecycle: the source is closed before `onDone`/`onError` fire, so a stream
 * that ended can never keep a spent ticket's connection open.
 */
export function attachGeoIpStreamHandlers(
  source: EventSource,
  handlers: GeoIpStreamHandlers,
): void {
  source.addEventListener('progress', (event: Event) => {
    try {
      handlers.onProgress(
        JSON.parse((event as MessageEvent<string>).data) as GeoIpProgressEvent,
      )
    } catch (err) {
      console.error('Failed to parse progress event', err)
    }
  })

  source.addEventListener('done', (event: Event) => {
    try {
      handlers.onProgress(
        JSON.parse((event as MessageEvent<string>).data) as GeoIpProgressEvent,
      )
    } catch {
      // ignore parse error on done event
    }
    source.close()
    handlers.onDone()
  })

  source.addEventListener('error', (event: Event) => {
    let message = 'Update request failed.'
    try {
      const raw = (event as MessageEvent<string | undefined>).data
      if (raw) {
        const parsed = JSON.parse(raw) as { message?: string }
        if (parsed.message) message = parsed.message
      }
    } catch {
      // ignore parse error on transport close
    }
    source.close()
    handlers.onError(message)
  })
}
