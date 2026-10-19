import { IP_DETAIL_TABS } from '@/constants/ips'
import type { IpDetailTab } from '@/types/ips'

/** The `?tab=` of a source's page, overview when missing or unknown. */
export function parseIpDetailTab(
  value: string | string[] | undefined,
): IpDetailTab {
  const raw = Array.isArray(value) ? value[0] : value
  return IP_DETAIL_TABS.find((tab) => tab === raw) ?? 'overview'
}
