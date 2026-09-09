'use client'

import type { GeoIpProgressEvent } from '@/types/geoipProgress'
import type {
  GeoIpStreamHandlers,
  UseGeoIpDbUpdateParams,
  UseGeoIpDbUpdateReturn,
} from '@/types/settings'
import { openGeoIpUpdateStream } from '@/utils/settings'
import { useState } from 'react'

/** Drives one database download over the progress stream. */
export function useGeoIpDbUpdate({
  apiKey,
  canUpdate,
  setMessage,
  onUpdated,
}: UseGeoIpDbUpdateParams): UseGeoIpDbUpdateReturn {
  const [isUpdatingDb, setIsUpdatingDb] = useState(false)
  const [progressData, setProgressData] = useState<GeoIpProgressEvent | null>(
    null,
  )
  const [startTime, setStartTime] = useState<number | null>(null)

  function handleUpdateDb(): void {
    if (!canUpdate) return
    setIsUpdatingDb(true)
    setMessage('')
    setProgressData({ step: 'Starting download...', progress: 0 })
    setStartTime(Date.now())

    const handlers: GeoIpStreamHandlers = {
      onProgress: setProgressData,
      onDone: () => {
        setTimeout(() => {
          setIsUpdatingDb(false)
          setMessage('Database updated successfully!')
          onUpdated()
          setProgressData(null)
        }, 1000)
      },
      onError: (errMsg: string) => {
        setIsUpdatingDb(false)
        setMessage(errMsg)
        setProgressData(null)
      },
    }

    void openGeoIpUpdateStream(apiKey, handlers)
  }

  return { isUpdatingDb, progressData, startTime, handleUpdateDb }
}
