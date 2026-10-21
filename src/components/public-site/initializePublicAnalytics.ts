import { publicAnalyticsId } from '../../constants/public-site/publicAnalyticsId'
import type { PublicAnalyticsWindow } from '../../types/public-check/PublicAnalyticsWindow'
import { publicAnalyticsCommand } from './publicAnalyticsCommand'

export function initializePublicAnalytics(): void {
  const target = window as PublicAnalyticsWindow
  target.gtag = publicAnalyticsCommand
  publicAnalyticsCommand('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  publicAnalyticsCommand('consent', 'update', { analytics_storage: 'granted' })
  publicAnalyticsCommand('js', new Date())
  publicAnalyticsCommand('config', publicAnalyticsId, {
    send_page_view: false,
    cookie_domain: 'insight.vexamail.com',
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: 'https://insight.vexamail.com/',
    page_referrer: '',
    page_title: 'Vexa Insight public checker',
  })
  publicAnalyticsCommand('event', 'page_view', {
    page_location: 'https://insight.vexamail.com/',
    page_referrer: '',
    page_title: 'Vexa Insight public checker',
  })
}
