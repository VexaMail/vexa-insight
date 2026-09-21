import type { IpFilterOption } from '@/types/ips'

export const ipLogsSortOptions: IpFilterOption[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'volume', label: 'Most messages' },
]
