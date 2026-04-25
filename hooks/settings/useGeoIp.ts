'use client'

import type { GeoIpProgressEvent } from '@/types/geoipProgress'
import type { UseGeoIpReturn } from '@/types/settings'
import { getEtaText } from '@/utils/geoip'
import { useEffect, useState } from 'react'

export function useGeoIp(apiKey: string): UseGeoIpReturn {
  const [licenseKey, setLicenseKey] = useState('')
  const [hasLicenseKey, setHasLicenseKey] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<string | null>(null)
  const [errorStatus, setErrorStatus] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdatingDb, setIsUpdatingDb] = useState(false)
  const [message, setMessage] = useState('')
  const [progressData, setProgressData] = useState<GeoIpProgressEvent | null>(
    null,
  )
  const [startTime, setStartTime] = useState<number | null>(null)

  useEffect(() => {
    if (!apiKey) return
    const loadSettings = async () => {
      try {
        const res = await fetch('/api/v1/admin/geoip/settings', {
          headers: { 'X-API-Key': apiKey },
        })
        const data = (await res.json()) as {
          data?: {
            hasLicenseKey: boolean
            geoipLastDbUpdateAt: string
            geoipLastDbUpdateError: string
          }
        }
        if (data.data) {
          setHasLicenseKey(data.data.hasLicenseKey)
          setLastUpdate(data.data.geoipLastDbUpdateAt)
          setErrorStatus(data.data.geoipLastDbUpdateError)
        }
      } catch (err) {
        console.error(err)
      }
    }
    void loadSettings()
  }, [apiKey])

  function handleSaveKey(): void {
    if (!licenseKey.trim()) return
    setIsLoading(true)
    setMessage('')
    const saveKey = async () => {
      try {
        const res = await fetch('/api/v1/admin/geoip/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
          body: JSON.stringify({ licenseKey }),
        })
        const json = (await res.json()) as { error?: { message?: string } }
        if (!res.ok) {
          setMessage(json.error?.message ?? 'Failed to save key')
        } else {
          setMessage('License key saved.')
          setHasLicenseKey(true)
          setLicenseKey('')
        }
      } catch {
        setMessage('Request failed.')
      } finally {
        setIsLoading(false)
      }
    }
    void saveKey()
  }

  function handleUpdateDb(): void {
    if (!hasLicenseKey && !licenseKey) return
    setIsUpdatingDb(true)
    setMessage('')
    setProgressData({ step: 'Starting download...', progress: 0 })
    setStartTime(Date.now())

    const eventSource = new EventSource(
      `/api/v1/admin/geoip/update-db-stream?apiKey=${encodeURIComponent(apiKey)}`,
    )

    eventSource.addEventListener('progress', (e: Event) => {
      try {
        const msgEvent = e as MessageEvent
        const data = JSON.parse(msgEvent.data) as GeoIpProgressEvent
        setProgressData(data)
      } catch (err) {
        console.error('Failed to parse progress event', err)
      }
    })

    eventSource.addEventListener('done', (e: Event) => {
      try {
        const msgEvent = e as MessageEvent
        const data = JSON.parse(msgEvent.data) as GeoIpProgressEvent
        setProgressData(data)
      } catch {
        // ignore parse error on done event
      }
      setTimeout(() => {
        setIsUpdatingDb(false)
        setMessage('Database updated successfully!')
        setLastUpdate(new Date().toISOString())
        setErrorStatus(null)
        setProgressData(null)
        eventSource.close()
      }, 1000)
    })

    eventSource.addEventListener('error', (e: Event) => {
      let errMsg = 'Update request failed.'
      try {
        const msgEvent = e as MessageEvent
        if (msgEvent.data) {
          const data = JSON.parse(msgEvent.data) as { message?: string }
          if (data.message) errMsg = data.message
        }
      } catch {
        // ignore parse error on transport close
      }
      setIsUpdatingDb(false)
      setMessage(errMsg)
      setProgressData(null)
      eventSource.close()
    })
  }

  const etaText = getEtaText(isUpdatingDb, progressData, startTime)

  return {
    licenseKey,
    setLicenseKey,
    hasLicenseKey,
    lastUpdate,
    errorStatus,
    isLoading,
    isUpdatingDb,
    message,
    progressData,
    startTime,
    etaText,
    handleSaveKey,
    handleUpdateDb,
  }
}
