import type { GeoIpProgressEvent } from '@/types/geoipProgress'

/**
 * UI callbacks for the GeoIP update SSE stream. The transport closes itself
 * before `onDone`/`onError` fire, so handlers only own presentation state.
 */
export type GeoIpStreamHandlers = {
  onProgress: (event: GeoIpProgressEvent) => void
  onDone: () => void
  onError: (message: string) => void
}
