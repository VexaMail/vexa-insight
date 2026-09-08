import type { ResolvedIpDisplayOptions } from '@/types/ips'

/**
 * Applies `IpDisplay`'s presentation defaults once, so the three layout
 * components share one definition of them rather than a copy each.
 */
export function resolveIpDisplayOptions(
  options: Readonly<Partial<ResolvedIpDisplayOptions>>,
): ResolvedIpDisplayOptions {
  return {
    className: options.className ?? '',
    ipAsLink: options.ipAsLink ?? true,
    isRefreshing: options.isRefreshing ?? false,
    showFlag: options.showFlag ?? true,
    showHostname: options.showHostname ?? true,
    showIp: options.showIp ?? true,
  }
}
