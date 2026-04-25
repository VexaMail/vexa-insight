import type { GeoIpProgressEvent } from '@/types/geoipProgress'

export function getEtaText(
  isUpdatingDb: boolean,
  progressData: GeoIpProgressEvent | null,
  startTime: number | null,
): string {
  if (
    !isUpdatingDb ||
    !progressData ||
    progressData.progress <= 0 ||
    progressData.progress >= 100 ||
    !startTime
  ) {
    return ''
  }

  const elapsedMs = Date.now() - startTime
  const progressFactor = progressData.progress / 100
  const estimatedTotalMs = elapsedMs / progressFactor
  const remainingMs = estimatedTotalMs - elapsedMs

  if (remainingMs <= 0 || remainingMs >= 600000) return ''

  const remainingSeconds = Math.max(1, Math.round(remainingMs / 1000))
  if (remainingSeconds > 60) {
    const mins = Math.floor(remainingSeconds / 60)
    const secs = remainingSeconds % 60
    return `~${mins}m ${secs}s remaining`
  }
  return `~${remainingSeconds}s remaining`
}
