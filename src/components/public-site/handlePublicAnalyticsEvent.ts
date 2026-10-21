import { publicAnalyticsCommand } from './publicAnalyticsCommand'

export function handlePublicAnalyticsEvent(event: Event): void {
  const name: unknown = (event as CustomEvent<unknown>).detail
  if (
    typeof name === 'string' &&
    [
      'checker_started',
      'checker_completed',
      'checker_failed',
      'installation_click',
    ].includes(name)
  )
    publicAnalyticsCommand('event', name, {
      page_location: 'https://insight.vexamail.com/',
      page_referrer: '',
      page_title: 'Vexa Insight public checker',
    })
}
