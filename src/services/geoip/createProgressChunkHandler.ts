import type { GeoIpProgressEvent } from '@/types/geoipProgress'
import { parseProgressLine } from '@/utils/geoip'

/**
 * Feeds the updater's output, line by line, to the progress callback. Partial
 * lines are buffered across chunks and progress never moves backwards.
 */
export function createProgressChunkHandler(
  onProgress: ((event: GeoIpProgressEvent) => void) | undefined,
): (chunk: Buffer | string) => void {
  let lastProgress = 1
  let lineBuffer = ''

  return (chunk: Buffer | string) => {
    lineBuffer += chunk.toString()
    const lines = lineBuffer.split('\n')
    // The last element may be an incomplete line – keep it in buffer
    lineBuffer = lines.pop() ?? ''
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue
      const parsed = parseProgressLine(trimmed, lastProgress)
      if (parsed && onProgress && parsed.progress >= lastProgress) {
        lastProgress = parsed.progress
        onProgress(parsed)
      }
    }
  }
}
