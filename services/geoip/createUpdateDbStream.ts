import type { GeoIpProgressEvent } from '@/types/geoipProgress'
import { updateGeoIpDb } from './admin'

export function createUpdateDbStream(): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder()

  return new ReadableStream({
    async start(controller) {
      const sendEvent = (event: string, data: unknown) => {
        controller.enqueue(
          encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`),
        )
      }

      try {
        await updateGeoIpDb({
          onProgress: (progressEvent: GeoIpProgressEvent) => {
            sendEvent('progress', progressEvent)
          },
        })
        sendEvent('done', {
          step: 'Database updated successfully!',
          progress: 100,
        })
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Update failed'
        sendEvent('error', { message })
      } finally {
        controller.close()
      }
    },
  })
}
