import type { PublicAnalyticsWindow } from '../../types/public-check/PublicAnalyticsWindow'

export function publicAnalyticsCommand(..._args: unknown[]): void {
  const target = window as PublicAnalyticsWindow
  target.dataLayer ??= []
  // Google tag consumes queued Arguments objects, not ordinary event arrays.
  // eslint-disable-next-line prefer-rest-params
  target.dataLayer.push(arguments)
}
