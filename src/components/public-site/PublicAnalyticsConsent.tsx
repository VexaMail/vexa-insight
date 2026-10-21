'use client'

import Script from 'next/script'
import { publicAnalyticsId } from '../../constants/public-site/publicAnalyticsId'
import type { PublicAnalyticsProps } from '../../types/public-check/PublicAnalyticsProps'
import { PublicConsentPanel } from './PublicConsentPanel'
import { usePublicAnalytics } from './hooks/usePublicAnalytics'
import { usePublicAnalyticsConsent } from './hooks/usePublicAnalyticsConsent'

export function PublicAnalyticsConsent({
  nonce,
}: Readonly<PublicAnalyticsProps>) {
  const { consent, ready, settings, accept, reject, openSettings } =
    usePublicAnalyticsConsent()
  usePublicAnalytics(consent)
  return (
    <div className="mx-auto max-w-6xl px-5 pb-6 text-xs sm:px-8">
      {consent === 'accepted' ? (
        <Script
          id="public-google-analytics"
          nonce={nonce}
          src={`https://www.googletagmanager.com/gtag/js?id=${publicAnalyticsId}`}
          strategy="afterInteractive"
        />
      ) : null}
      <button
        type="button"
        onClick={openSettings}
        className="text-muted-foreground min-h-11 underline underline-offset-4"
      >
        Analytics preferences
      </button>
      {ready && (!consent || settings) ? (
        <PublicConsentPanel accept={accept} reject={reject} />
      ) : null}
    </div>
  )
}
