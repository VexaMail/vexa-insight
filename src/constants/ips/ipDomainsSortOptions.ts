import type { IpFilterOption } from '@/types/ips'

export const ipDomainsSortOptions: IpFilterOption[] = [
  { value: 'volume', label: 'Most messages' },
  { value: 'lastSeen', label: 'Last seen' },
  { value: 'domain', label: 'Domain A-Z' },
]
