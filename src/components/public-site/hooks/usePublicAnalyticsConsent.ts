import { useEffect, useState } from 'react'
import { clearPublicAnalytics } from '../clearPublicAnalytics'

export function usePublicAnalyticsConsent() {
  const [consent, setConsent] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const [settings, setSettings] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setConsent(localStorage.getItem('vexa-analytics-consent'))
      } catch {
        /* Unavailable storage leaves analytics disabled. */
      }
      setReady(true)
    }, 0)
    return () => {
      clearTimeout(timer)
    }
  }, [])
  const choose = (value: 'accepted' | 'rejected') => {
    try {
      localStorage.setItem('vexa-analytics-consent', value)
    } catch {
      /* The choice remains valid for this page. */
    }
    if (value === 'rejected') clearPublicAnalytics()
    setConsent(value)
    setSettings(false)
  }
  return {
    consent,
    ready,
    settings,
    accept: () => {
      choose('accepted')
    },
    reject: () => {
      choose('rejected')
    },
    openSettings: () => {
      setSettings(true)
    },
  }
}
