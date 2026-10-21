import { publicAnalyticsCommand } from './publicAnalyticsCommand'

export function clearPublicAnalytics(): void {
  publicAnalyticsCommand('consent', 'update', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0]?.trim() ?? ''
    if (!/^_ga(?:_|$)/.test(name)) continue
    for (const domain of [
      '',
      '; Domain=insight.vexamail.com',
      '; Domain=.vexamail.com',
    ])
      document.cookie = `${name}=; Max-Age=0; Path=/${domain}`
  }
}
