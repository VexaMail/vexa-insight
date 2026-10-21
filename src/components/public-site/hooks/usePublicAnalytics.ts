import { useEffect } from 'react'
import { handlePublicAnalyticsEvent } from '../handlePublicAnalyticsEvent'
import { initializePublicAnalytics } from '../initializePublicAnalytics'

export function usePublicAnalytics(consent: string | null): void {
  useEffect(() => {
    if (consent !== 'accepted') return
    initializePublicAnalytics()
    window.addEventListener('vexa-public-analytics', handlePublicAnalyticsEvent)
    return () => {
      window.removeEventListener(
        'vexa-public-analytics',
        handlePublicAnalyticsEvent,
      )
    }
  }, [consent])
}
